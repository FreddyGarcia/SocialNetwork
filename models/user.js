var models = require('./db'),
	Schema = models.Schema;

var userSchema = Schema({
	username : 'string',
	lastname : 'string',
	email	 : 'string',
	password : 'string'
});

var User = models.model('User', userSchema);

module.exports = User;

