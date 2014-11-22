var mongo = require('mongodb').MongoClient;
var async = require('async');

var messages = [];

var mongoController = function (io, sockets) {

    function broadcast(event, data) {
        sockets.forEach(function (socket) {
            socket.emit(event, data);
        });
    }

    function updateRoster() {
        async.map(
            sockets,
            function (socket, callback) {
                socket.get('name', callback);
            },
            function (err, names) {
                broadcast('roster', names);
            }
        );
    }


    mongo.connect('mongodb://localhost/test', function (err, db) {
        io.on('connection', function (socket) {

            //
            // Colecciones
            //
            var users = db.collection('users');
            var chat = db.collection('chat');

            var o = users.find().toArray(function (err, data) {
                data.forEach(function (item, i) {
                    console.log(item._id);
                })
            });

            messages.forEach(function (data) {
                socket.emit('message', data);
            });

            sockets.push(socket);

            socket.on('disconnect', function () {
                sockets.splice(sockets.indexOf(socket), 1);
                updateRoster();
            });

            socket.on('message', function (msg) {

                var text = String(msg.text || '');

                if (!text)
                    return;

                chat.save({
                    username: msg.user,
                    message: msg.text
                });

                socket.get('name', function (err, name) {
                    var data = {
                        id: socket.id,
                        name: name,
                        text: text
                    };

                    if (msg.destino !== "") {

                        io.sockets.socket(users[msg.destino]).emit('message', data);
                        return;
                    }

                    broadcast('message', data);

                    messages.push(data);

                });
            });

            socket.on('identify', function (name) {
                users[name] = socket.id;
                socket.set('name', String(name || 'Anonymous'), function (err) {
                    updateRoster();
                });
            });
        });
    });
}

module.exports = mongoController;