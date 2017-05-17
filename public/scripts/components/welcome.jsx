import React from 'react';
import ReactDom from 'react-dom';

export default class extends React.Component{
	constructor(props){
		super(props);
	}
	checkInput(){
		if(this.textInput.value != ""){
			this.props.toggleState(this.textInput.value);
		}
	}
	render(){
		return(
			<div className="main">
				<div className="welcome_form">
					<h3>Enter your nick name</h3>
					<input className="form-control" type="text" ref={(input) => { this.textInput = input; }}/>
					<button className="btn btn-primary" onClick={this.checkInput.bind(this)}>Enter</button>
				</div>
			</div>
		)
	}
}