var express = require('express'),
    path = require('path'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(8085);
console.log('Listening on port 8085...');

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket){
	console.log("user connected")
});