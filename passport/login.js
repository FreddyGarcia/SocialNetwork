var passport       = require('passport'),
	bcrypt		   = require('bcrypt-nodejs'),
	LocalStrategy  = require('passport-local').Strategy,
	User 		   = require('../models/user');


var passport_login = function () {
	passport.use('login', new LocalStrategy({
		usernameField 	  : 'email',
		passReqToCallback : true
	},

	function (req, username, password, done) {

		var query = { email : username};

		User.findOne(query, function (err, user) {
			if (err)
				return done(err);
			if (!user)
				return done(null, false, req.flash('error', 'El usuario no existe'));
			if (!bcrypt.compareSync(password, user.password))				
				return done(null, false, req.flash('error', 'Password incorrecto'));
			// 	return done(null, false, {message : 'Password incorrecto'});
			return done(null, user);

		});
	}));
}

module.exports = passport_login;