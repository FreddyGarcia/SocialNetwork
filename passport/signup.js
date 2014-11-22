var passport 	   = require('passport'),
	bcrypt		   = require('bcrypt-nodejs'),
	LocalStrategy  = require('passport-local').Strategy,
	User 		   = require('../models/user');


var passport_signup = function () {
	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	},

	function (req, username, password, done) {
		var query = { email : req.body.email };

		User.findOne(query, function (err, user) {
			if (err)
				return done(err);
			if (user)
				return done(null, false, req.flash('error', 'Ese correo ya esta registrado'));
				// return done(null, false, {message : 'El usuario ya existe'});
			else {
				var user = new User({
					username : username,
					lastname : req.body.lastname,
					email    : req.body.email,
					password : bcrypt.hashSync(password)
				});

				user.save(function (err) {
					if (err)
						throw err;
				});

				return done(null, user);

			}
		});
	}));
}

module.exports = passport_signup;