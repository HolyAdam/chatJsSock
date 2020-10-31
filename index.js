const express = require('express')
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server)

server.listen(3000);

app.get('/', function(request, resp) {
	resp.sendFile(__dirname + '/index.html');
})

const users = [],
	  connections = [];

io.sockets.on('connection', socket => {
	console.log('Соединение!')
	connections.push(socket)

	socket.on('disconnect', data => {
		connections.splice(connections.indexOf(socket), 1)
		console.log('Отключились!')
	})

	socket.on('sendin', data => {
		io.sockets.emit('addin', {msg: data.textar, name: data.name, color: data.className})
	})

})

