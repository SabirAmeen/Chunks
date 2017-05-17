var socket = io();
function textEnter(){
	if(event.keyCode == 13){
		socket.emit("newMessage",$("#input").val());
	}
}
socket.on("displayMsg",function(item){
	console.log(item)
	$("#display").text(item);
})