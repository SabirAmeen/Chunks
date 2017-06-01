import React from 'react';
import ReactDom from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import {reducer, initialState} from './reducers.jsx';
import Main from './components/main.jsx';
var store = createStore(reducer,initialState);

ReactDom.render(
	<Provider store = {store}>
		<Main/>
	</Provider>,
	document.getElementById('app'));