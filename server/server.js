var express = require('express');
var app = express();
var config = require('../app-config');

app.use(express.static(config.paths.server));
app.use(express.static('./'));

app.listen(8080, function(){

});