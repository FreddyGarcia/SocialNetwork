//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');

var socketio = require('socket.io');
var express = require('express');
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
//
//
//
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var messages = [];
var sockets  = [];
var users    = [];

var config          = require('./config');
var routes          = require('./routes');

// Controllers
var passport_login	 	= require('./passport/login');
var passport_signup 	= require('./passport/signup');

// configuracion
config(app, express);

passport_login();
passport_signup();

// rutas
routes(app);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});	