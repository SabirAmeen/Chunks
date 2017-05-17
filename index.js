var express = require('express'),
    path = require('path'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', function(socket) {
    console.log("user connected");
    socket.on("newMessage", function(chat) {
        io.emit("displayMsg", chat);
    })
});

server.listen(8085);
console.log('Listening on port 8085...');
