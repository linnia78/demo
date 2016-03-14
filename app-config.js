var server = './server';
var app = './app';
var dist = './dist';

var paths = {
    server: server,
    sass: app + '/sass',
    sassOut: dist + '/sass'
};

var files = {
    sass: app + '/sass/**/*.scss',
    server: server + '/server.js'
};

var config = {
    paths: paths,
    files : files
};

module.exports = config;