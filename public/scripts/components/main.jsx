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
		this.state={
			userName: "",
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
	    Notification.requestPermission(function (permission) {
	      // If the user accepts, let's create a notification
	      if (permission === "granted" && chat.name!=this.state.userName) {
			notification = new Notification(chat.name,{
				body: chat.msg,
				iconUrl:'../../images/noti.png',
				icon: '../../images/noti.png'
			});
	      }
	    }.bind(this));
	  }
	}
	componentDidMount(){
		this.socket.on("displayMsg",function(chat){
			this.pushChat(chat);
			this.notifyme(chat);
		}.bind(this))
	}
	componentDidUpdate(){
		$(".chat_container").scrollTop($(".chat_container").children().height());
	}
	pushChat(chat){
		var chats = this.state.chats;
		chats.push(chat)
		this.setState({chats: chats})
	}
	newChatMsg(msg){
		var name = this.state.userName
		this.socket.emit("newMessage",{msg, name});
	}
	toggleState(name){
		this.setState({chatVisible: true, userName: name})
	}
	render(){
		return(
			<div className="container">
				<ChatList chats={this.state.chats}/>
				{
					this.state.chatVisible? <InputField newChatMsg = {this.newChatMsg.bind(this)} />:<Welcome toggleState = {this.toggleState.bind(this)} />
				}
			</div>
		)
	}
}