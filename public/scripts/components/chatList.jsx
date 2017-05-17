import React from 'react';
import ReactDom from 'react-dom';

export default class extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="chatlist_container">
				{
					this.props.chats.map(function(item,index){
						return(
							<div key={index} className="chat">
								{item.name}
								<div className="talk-bubble tri-right left-in">
  									<div className="talktext">
    									<p>{item.msg}</p>
  									</div>
								</div>
							</div>
							)
					})
				}
			</div>
			)
	}
}