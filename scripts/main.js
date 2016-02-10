// NPM Modules
var React = require('react');
var ReactDOM = require('react-dom');
var creatBrowserHistory = require('history/lib/createBrowserHistory');

//React Router keeps your UI in sync with the URL
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;



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

// NotFound Component
var NotFound = React.createClass({

	render() {
		return (
			<h1> Not Found! </h1>
		)
	}
});


/*
	Routes
 */


var routes = (
	// history allows you to clean up URL and still keep state without the etc generated IDs by Router
	<Router history={ creatBrowserHistory() }>
		<Router path="/" component={ StorePicker }/>
		<Router path="/store/:storeId" component={ App }/>
		<Router path="*" component={ NotFound }/>
	</Router>
)

// Take Routes & depending on the URL it will choose which Route to display as the page
// e.g "/" will take you to the StorePicker
ReactDOM.render(routes, document.querySelector('#main'));