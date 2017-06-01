export const current = (state) => {
	return {
		current: state
	}
}
export const action = (dispatch) => {
	return {
		pushChat: () => {
			dispatch({
				type: "push chat"
			})
		},
		toggleVisibility: (obj) => {
			dispatch({
				type: "toggle",
				session: obj
			})
		},
		typing: (obj) => {
			dispatch({
				type: "typing",
				moment: obj
			})
		}
	}
}