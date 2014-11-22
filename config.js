var passport   = require('passport');
var path 	   = require('path');
var session    = require('express-session');

var flash 	= require('connect-flash');
var User    = require('./models/user');
var swig	= require('swig');

var config = function (app, express) {
	app.use(express.static(path.resolve(__dirname, './public')));

	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.cookieParser());

	// required for passport
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions

	// flash configuration
	app.use(flash());


	// locations static content
	app.engine('html', swig.renderFile)
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');


	// passport config

	passport.serializeUser(function (user, done) {
		done(null, user);
	});
	
	passport.deserializeUser(function (id, done) {
		User.findById(id._id, function (err, user) {
			done(err, user);
		});
	});
}

module.exports = config; 