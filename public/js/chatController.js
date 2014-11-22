 function ChatController($scope) {
        var socket = io.connect();

        $scope.messages = [];
        $scope.roster = [];
        $scope.name = '';
        $scope.text = '';
        $scope.destino = '';

        socket.on('connect', function () {
          $scope.setName();
        });

        socket.on('message', function (msg) {
          $scope.messages.push(msg);
          $scope.$apply();
        });

        socket.on('roster', function (names) {
          $scope.roster = names;
          $scope.$apply();
        });

        $scope.send = function send() {
          console.log('Sending message:', $scope.text);
          socket.emit('message', {user : document.title,  text : $scope.text, destino : $scope.destino});
          $scope.text = '';
        };

        $scope.setName = function setName() {
          socket.emit('identify', username);
        };
      }