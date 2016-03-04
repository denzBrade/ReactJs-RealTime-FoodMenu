/**
 * Main App File
 * @type {[Components]}
 */

import React from 'react';

import Catalyst from 'react-catalyst';

import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://reactjs-foodmenu.firebaseio.com/');



var App = React.createClass({

	mixins : [Catalyst.LinkedStateMixin],

	// set up initial empty state for fishes & order on load, these can then be passed data
	getInitialState() {
		return {
			fishes : {},
			order : {}
		}
	},

	// invoked once on initial load to sync our local state to our firebase state
	componentDidMount() {
		base.syncState(this.props.params.storeId + "/fishes", {
			context : this, // Refers to app component
			state : "fishes"
		});

		// Restoring the local storage data when the page is reloaded
		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

		if(localStorageRef) {
			// update our component state to reflect what is in localStorage
			this.setState({
				order : JSON.parse(localStorageRef)
			});
		}
	},

	// updates props and state whenever they have been changed
	componentWillUpdate(nextProps, nextState) {
		// HTML5 local storage - store data locally within the user's browser
		// Local storage needs to be passed through JSON to accept an object
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
	},

	addToOrder(key) {
		// when adding a item add itself + 1 if a value exists (e.g if value is 5 then new value will be 6)
		// Else set value to 1 (assuming there is no prior this will be the first item)
		this.state.order[key] = this.state.order[key] + 1 || 1;
		// set the state
		this.setState({ order : this.state.order });
	},

	removeFromOrder(key) {
		delete this.state.order[key];
		this.setState({ order : this.state.order })
	},

	// method to add the fish to the state
	addFish(fish) {
		// can be used to generate a unique ID, it increments each second
		var timestamp = (new Date()).getTime();

		// update the state object by creating a unique ID e.g. 'fish-12345678'
		this.state.fishes['fish-' + timestamp] = fish;

		// set the state (pass it the state object it needs to compare (itself) to enhance performance)
		this.setState({ fishes : this.state.fishes });
	},

	removeFish(key) {
		if(confirm("Are you sure you want to remove this fish?")) {
			this.state.fishes[key] = null;
			this.setState({
				fishes : this.state.fishes
			});
		}
	},

	// method to load in JSON file of sample fishes to our 'fishes' state
	loadSamples() {
		this.setState({
			fishes : require('../sample-fishes')
		});
	},

	renderFish(key) {
		return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
	},

	// Render our Main App component with all its child components
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seadfood Good"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>

				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
				{/* Supply addFish as a prop for inventory to access the addFish func */}
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}
					fishes={this.state.fishes} linkState={this.linkState} removeFish={this.removeFish} />
			</div>
		)
	}
})

export default App;