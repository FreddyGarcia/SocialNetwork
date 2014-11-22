var async = require('async');
var User = require('../models/user');
var Chat = require('../models/chat');
var mongoose = require('../models/db');
var users = [];

var appController = function (io, sockets, messages) {
    io.on('connection', function (socket) {

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

    function broadcast(event, data) {
        sockets.forEach(function (socket) {
            socket.emit(event, data);
        });
    }
}

module.exports = appController;