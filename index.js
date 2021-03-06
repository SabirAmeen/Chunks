var express = require('express'),
    path = require('path'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log(socket.handshake.address);
    socket.on("newMessage", (chat) => {
        socket.broadcast.emit("displayMsg", chat);
    })
    socket.on("typing",(item) => {
   		socket.broadcast.emit("typingMsg", item);
    })
});

server.listen(8085);
console.log('Listening on port 8085...');
