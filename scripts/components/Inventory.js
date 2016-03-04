/**
 * Inventory
 * @type {[Components]}
 */

import React from 'react';
import AddFishForm from './AddFishForm';


var Inventory = React.createClass({
	renderInventory(key) {
		var linkState = this.props.linkState;
		return(
			<div className="fish-edit" key={key}>
				<input type="text" valueLink={linkState('fishes.' + key + '.name')}/>
				<input type="text" valueLink={linkState('fishes.' + key + '.price')}/>
				<select type="text" valueLink={linkState('fishes.' + key + '.status')}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" valueLink={linkState('fishes.' + key + '.desc')}></textarea>
				<input type="text" valueLink={linkState('fishes.' + key + '.image')}/>
				<button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
			</div>
		)
	},

	render() {
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				{/* ...this.props is called a 'spread' allows you to access all of the props passed down from inventory */}
				<AddFishForm {...this.props}/>
				{/* On click load the sample fishes to our application */}
				<button onClick={this.props.loadSamples}> Load Sample Fishes </button>
			</div>
		)
	},

	// PropType Validation, making sure the correct data is passed via props
	propTypes : {
		addFish : React.PropTypes.func.isRequired,
		loadSamples : React.PropTypes.func.isRequired,
		fishes : React.PropTypes.object.isRequired,
		linkState : React.PropTypes.func.isRequired,
		removeFish : React.PropTypes.func.isRequired
	}
});

export default Inventory;