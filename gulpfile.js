var gulp = require('gulp');
var sass = require('gulp-sass');
var util = require('gulp-util');
var config = require('./app-config');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src(config.files.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix("last 2 versions"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.sassOut));
});

gulp.task('sass:watch', function () {
    gulp.watch(config.files.sass, ['sass']);
});

function sync(){
    if (browserSync.active) return;
    util.log('*** browser-sync started');

    var options = {
        proxy: 'localhost:' + 8080,
        port: 8001,
        files: [
            config.paths.app + '**/*.*'
        ],
        ghostMode: {
            clicks:true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };
    browserSync(options);
}

gulp.task('start', ['sass'], function() {
    var options = {
        script: config.files.server,
        delayTime: 1,
        ext: 'scss html',
        tasks: ['sass'],
        watch: ['./app']
    }
    nodemon(options)
        .on('restart', function(ev){
            util.log('*** server restarted');
            util.log('files changed:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading');
                browserSync.reload({stream:false});
                util.log('*** browser-sync restarted')
            }, 1000)
        })
        .on('start', function(){
            util.log('*** server started');
            sync();
        })
        .on('crash', function(){
            util.log('*** server crashed');
        })
        .on('exit', function(){
            util.log('*** server exit');
        })
});