var React = require('react');
var ReactDOM = require('react-dom');

// Main App Component
var App = React.createClass({

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seadfood Good"/>
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
		console.log(this.props);
		return (
			<header className="top">
				<h1>Catch
					<span className="ofThe">
						<span className="of">of</span>
						<span className="The">the</span>
					</span>
				Day</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
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