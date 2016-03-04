/**
 * Order
 * @type {[Components]}
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';

var Order = React.createClass({

	renderOrder(key) {
		// pass fish data down threw props
		var fish = this.props.fishes[key];
		var count = this.props.order[key];
		// Reusable remove button
		var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>

		// If there is no fish, return message
		if(!fish) {
			return <li key={key}>Sorry fish no longer available!</li>
		}

		return (
			<li key={key}>
				<span>
					<ReactCSSTransitionGroup component="span" transitionName="count"
					transitionEnterTimeout={250} transitionLeaveTimeout={250}>
						<span key={count}> {count} lbs</span>
					</ReactCSSTransitionGroup>

					{fish.name}{removeButton}
				</span>
				{/* calculate the amount ordered * price */}
				<span className="price">{h.formatPrice(count * fish.price)}</span>
			</li>
		)
	},

	render() {
		// create an array of all the fishes
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key) => {
			var fish = this.props.fishes[key];
			var count = this.props.order[key];
			var isAvailable = fish && fish.status === 'available';

			if(fish && isAvailable) {
				return prevTotal + count * parseInt(fish.price) || 0;
			}

			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2 className="order-title">Your order</h2>

				<ReactCSSTransitionGroup
					className="order"
					component="ul"
					transitionName="order"
					transitionEnterTimeout={5000}
					transitionLeaveTimeout={5000}
					>
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</ReactCSSTransitionGroup>
			</div>
		)
	},

	// PropType Validation, making sure the correct data is passed via props
	propTypes : {
		fishes : React.PropTypes.object.isRequired,
		order : React.PropTypes.object.isRequired,
		removeFromOrder : React.PropTypes.func.isRequired
	}
});

export default Order;