import React from 'react';
import ReactDom from 'react-dom';

export default class extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidUpdate() {
    	const elem = ReactDom.findDOMNode(this.ele);
   	    if (elem) {
    	  elem.scrollIntoView(false);
    	}
    }
	render(){
		return(
			<div className="chatlist_container">
				{
					this.props.chats.map((item,index) => {
						var chat;
						if(item.status=="received"){
							chat =	<div key={index} className="chat" ref = {(node) => {this.ele = node}}>
								{item.name}
								<div className="talk-bubble tri-right left-in">
  									<div className="talktext">
    									<p>{item.msg}</p>
  									</div>
								</div>
							</div>
						}
						else{
							chat = 	<div key={index} className="chat send" ref = {(node) => {this.ele = node}}>
								<div className="talk-bubble tri-right left-in send">
  									<div className="talktext">
    									<p>{item.msg}</p>
  									</div>
								</div>
								{item.name}
							</div>
						}
						return chat
					})
				}
			</div>
			)
	}
}