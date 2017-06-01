import React from 'react';
import ReactDom from 'react-dom';
import ChatList from './chatList.jsx';
import $ from 'jquery';
import InputField from './inputList.jsx'
import Welcome from './welcome.jsx';

export default class extends React.Component{
	constructor(props){
		super(props);
		this.socket = io();
		this.timer;
		this.state={
			userName: "",
			typing: false,
			typer: "",
			chatVisible: false,
			chats:[]
		}
	}
	notifyme(chat){
	  // Let's check if the browser supports notifications
	  var notification
	  if (!("Notification" in window)) {
	    alert("This browser does not support desktop notification");
	  }
	  // Let's check whether notification permissions have already been granted
	  else if (Notification.permission === "granted" && chat.name!=this.state.userName) {
	    // If it's okay let's create a notification
		notification = new Notification(chat.name,{
			body: chat.msg,
			iconUrl:'../../images/noti.png',
			icon: '../../images/noti.png'
		});
	  }

	  // Otherwise, we need to ask the user for permission
	  else if (Notification.permission !== "denied") {
	    Notification.requestPermission((permission) => {
	      // If the user accepts, let's create a notification
	      if (permission === "granted" && chat.name!=this.state.userName) {
			notification = new Notification(chat.name,{
				body: chat.msg,
				iconUrl:'../../images/noti.png',
				icon: '../../images/noti.png'
			});
	      }
	    });
	  }
	}
	componentDidMount(){
		this.socket.on("displayMsg", (chat) => {
			chat.status = "received";
			this.setState({typing: false});
			this.pushChat(chat);
			this.notifyme(chat);
		})
		this.socket.on("typingMsg",function(item){
			this.setState({typing: item.typing, typer: item.userName})
		})
	}
	componentDidUpdate(){
		$(".chat_container").scrollTop($(".chat_container").children().height());
	}
	change(){
		clearTimeout(this.timer);
		var typing, userName;
		userName = this.state.userName;
		typing = true;
		this.socket.emit("typing", {userName, typing});
		this.timer = setTimeout(() => {
			typing = false;
			this.socket.emit("typing", {userName, typing});
		},2000)
	}
	pushChat(chat){
		var chats = this.state.chats;
		chats.push(chat)
		this.setState({chats: chats})
	}
	newChatMsg(msg){
		var name = this.state.userName;
		var chats = {msg,name};
		chats.status = "send";
		this.pushChat(chats)
		this.socket.emit("newMessage",{msg, name});
	}
	toggleState(name){
		this.setState({chatVisible: true, userName: name})
	}
	render(){
		return(
			<div className="container">
				<ChatList chats={this.state.chats}/>
					<div id="typing" className={this.state.typing?"visible":"hidden"}>{this.state.typer} is typing.....</div>
				{	
					this.state.chatVisible? <InputField newChatMsg = {this.newChatMsg.bind(this)} change = {this.change.bind(this)} />:<Welcome toggleState = {this.toggleState.bind(this)} />
				}
			</div>
		)
	}
}