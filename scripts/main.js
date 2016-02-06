var React = require('react');
var ReactDOM = require('react-dom');

// Main App Component
var App = React.createClass({

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header />
				</div>

				<Order />
				<Inventory />
			</div>
		)
	}
})

// Header Component
var Header = React.createClass({

	render() {
		return (
			<p>Header</p>
		)
	}
});

// Order Component
var Order = React.createClass({

	render() {
		return (
			<p>Order</p>
		)
	}
});
// Inventory Component
var Inventory = React.createClass({

	render() {
		return (
			<p>Inventory</p>
		)
	}
});

// StorePicker Component
var StorePicker = React.createClass({

	render() {
		return (
			<form className="store-selector">
				<h2>Please Enter a Store</h2>
				<input type="text" ref="storeId" required/>
				<input type="Submit" />
			</form>
		)
	}
});

// Take StorePicker Componenet and Render it to the DOM
ReactDOM.render(<App />, document.querySelector('#main'));