/**
 * Store Picker
 * @type {[Components]}
 */

import React from 'react';
import { History } from 'react-router';

import h from '../helpers';

var StorePicker = React.createClass({

	mixins: [History],

	goToStore(event) {
		event.preventDefault();
		// get the data from input
		var storeId = this.refs.storeId.value;

		// transition from <StorePicker /> to <App />
		this.history.pushState(null, '/store/' + storeId);
	},

	render() {
		return (
			<form className="store-selector" onSubmit={ this.goToStore }> {/* 'this' refers to StorePicker */}
				<h2>Please Enter a Store</h2>
				<input type="text" ref="storeId" defaultValue={ h.getFunName()} required />
				<input type="Submit" />
			</form>
		)
	}
});

export default StorePicker;