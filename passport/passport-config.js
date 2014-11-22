var passport 	   = require('passport'),
	LocalStrategy  = require('passport-local').Strategy,
	User 		   = require('./models/user');

var passport_config = function () {

	passport.use(new LocalStrategy(
		function (email, password, done) {
			var query = { email : email };

			User.findOne(query, function (err, user) {
				if (err)
					return done(err);
				if (!user)
					return done(null, false, {message : 'El usuario no existe'});
				if (!user.validPassword(password))
					return done(null, false, {message : 'Password incorrecto'});
				return done(null, user);

			})
		}
	));
} 

module.exports = passport_config; 