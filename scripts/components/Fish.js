/**
 * Fish
 * @type {[Components]}
 */

import React from 'react';
import h from '../helpers';

var Fish = React.createClass({
	// When button is clicked run Method addToOrder
	onButtonClick() {
		console.log('Adding fish to order', this.props.index);
		// variable for key
		var key = this.props.index;
		// Run method addToOrder
		this.props.addToOrder(key);
	},

	render() {
		var details = this.props.details;
		// if status === 'available' then true otherwise false
		var isAvailable = (details.status === 'available' ? true : false);
		// If available button text display Add to Order otherwise display sold out
		var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
		return (
			<li className="menu-fish">
				<img src={details.image} alt="" />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				{/* If product is Not avialble activate disabled feature */}
				<button disabled={!isAvailable} onClick={this.onButtonClick}>
					{buttonText}
				</button>
			</li>
		)
	}
});

export default Fish;