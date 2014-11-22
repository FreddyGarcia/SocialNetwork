var models = require('./db'),
	Schema = models.Schema;

var chatSchema = Schema({
	message	 : 'string',
	user	 : {
		type : Schema.Types.ObjectId,
		ref  : 'User'
	}
});

var Chat = models.model('Chat', chatSchema);

module.exports = Chat;

