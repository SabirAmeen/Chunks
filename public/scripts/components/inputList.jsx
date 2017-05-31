import React from 'react';
import ReactDom from 'react-dom';

export default class extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount() {
		this.textInput.focus();
	}
	enter(e){
		if(e.keyCode == 13){
			this.chatMsg();
		}
	}
	chatMsg(){
		if(this.textInput.value != ""){
			this.props.newChatMsg(this.textInput.value);
			this.textInput.value = "";
		}
	}
	render(){
		return(
			<div className="inputfield_container">
				<input className="form-control" type="text" onKeyDown = {this.enter.bind(this)} onChange = {this.props.change} ref={(input) => { this.textInput = input; }}/>
				<button className="btn btn-primary" onClick={this.chatMsg.bind(this)}>Send</button>
			</div>
		)
	}
}