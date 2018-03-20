
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import cookie from 'react-cookie';
import rootReducer from './reducers/rootReducer';
import App from './components/app.jsx';
import { composeWithDevTools } from 'redux-devtools-extension';
import actionTypes from './actions/types';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/index';



//const logger = createLogger();

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))
if (localStorage.jwtToken) {
	console.log('decoded ', jwt.decode(localStorage.jwtToken))
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser( jwt.decode(localStorage.jwtToken)));
}

//wut do we do with this
// const token = cookie.load('token');
// if(token) {
// 	store.dispatch({type: actionTypes.AUTH_USER});
// }

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
)



