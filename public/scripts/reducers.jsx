export const initialState = {
	userName: "",
	typing: false,
	typer: "",
	chatVisible: false,
	chats:[]
}
export var reducer = (state, action) => {
	if(state == undefined){
		return initialState;
	}
	else if(action.type == "push chat"){
		return Object.assign({}, state, action.input)
	}
	else if(action.type == "toggle"){
		return Object.assign({}, state, action.session)
	}
	else if(action.type == "typing"){
		return Object.assign({}, state, action.moment)
	}
	else {
		return state;
	}
}
