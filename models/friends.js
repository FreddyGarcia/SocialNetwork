var models = require('./db'),
	Schema = models.Schema;

var friendSchema = Schema({
	me		 : {
		type : Schema.Types.ObjectId,
		ref  : 'User'
		},
	friend	 : Schema.Types.Array
	}
});

var friend = models.model('friend', friendSchema);

module.exports = friend;

