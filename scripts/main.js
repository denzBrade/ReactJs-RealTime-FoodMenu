// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';

//React Router keeps your UI in sync with the URL
import { Router, Route } from 'react-router';

import {createHistory} from 'history';


/** Import Components **/
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import App from './components/App';

/*
	Routes
 */
var routes = (
	// history allows you to clean up URL and still keep state without the extra generated IDs by Router
	<Router history={ createHistory() }>
		<Router path="/" component={ StorePicker }/>
		<Router path="/store/:storeId" component={ App }/>
		<Router path="*" component={ NotFound }/>
	</Router>
)

// Take Routes & depending on the URL it will choose which Route to display as the page
// e.g "/" will take you to the StorePicker
ReactDOM.render(routes, document.querySelector('#main'));