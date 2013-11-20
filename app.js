
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var faye = require('faye');
var path = require('path');

var hydraComm = require('./lib/hydra.js')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app);
var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.attach(server);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var testPub = function(){
    bayeux.getClient().publish('/display1', {
        v: " 3.45",
        a: " 1.40"
    });
 }

setInterval(testPub,1000);

hydraComm.test();