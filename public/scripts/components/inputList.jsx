import React from 'react';
import ReactDom from 'react-dom';

export default class extends React.Component{
	constructor(props){
		super(props);
	}
	chatMsg(){
		this.props.newChatMsg(this.textInput.value);
		this.textInput.value = "";
	}
	render(){
		return(
			<div className="inputfield_container">
				<input className="form-control" type="text" ref={(input) => { this.textInput = input; }}/>
				<button className="btn btn-primary" onClick={this.chatMsg.bind(this)}>Send</button>
			</div>
		)
	}
}