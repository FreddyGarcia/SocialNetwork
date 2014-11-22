var mongo = require('mongodb').MongoClient;

var ioController = function (io){
	mongo.connect('mongodb://localhost/test', function (err, db) {
		io.on('connection', function (socket) {

            // Colecciones
            var users = db.collection('users');
            var chat = db.collection('chat');

            socket.on('loggin', function (data) {
	            users.save({
	            	username : data.username
	            });
            });
		})
	})
}

module.exports = ioController;