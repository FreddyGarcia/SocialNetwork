var passport       = require('passport'),
	LocalStrategy  = require('passport-local').Strategy,
	User 		   = require('../models/user');


var passport_login = function () {
	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	},

	function (req, username, password, done) {

		var query = { email : username };

		User.findOne(query, function (err, user) {
			if (err)
				return done(err);
			if (!user)
				return done(null, false, req.flash({message : 'El usuario no existe'}));
				// return done(null, false);
			// if (!user.validPassword(password))
			// 	return done(null, false, {message : 'Password incorrecto'});
			return done(null, user);

		});
	}));
}

module.exports = passport_login;