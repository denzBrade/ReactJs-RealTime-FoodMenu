// NPM Modules
var React = require('react');
var ReactDOM = require('react-dom');
var creatBrowserHistory = require('history/lib/createBrowserHistory');

//React Router keeps your UI in sync with the URL
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;

// Script files
var h = require('./helpers');


// Main App Component
var App = React.createClass({

	// set up initial empty state for fishes & order on load, these can then be passed data
	getInitialState() {
		return {
			fishes : {},
			order : {}
		}
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

	// Render our Main App component with all its child components
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seadfood Good"/>
				</div>

				<Order />
				{/* Supply addFish as a prop for inventory to access the addFish func */}
				<Inventory addFish={this.addFish}/>
			</div>
		)
	}
})

/*
	Add fish Form
	<AddFishForm />
*/

var AddFishForm = React.createClass({

	createFish(event) {
		// 1. Prevent form from submitting
		event.preventDefault();
		// 2. Take the data from the form and create an object
		var fish = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			status : this.refs.status.value,
			desc : this.refs.desc.value,
			image : this.refs.image.value
		}

		// 3. Add the fish to the App state
		this.props.addFish(fish);
		// clears the form after it has been submitted
		this.refs.fishForm.reset();

	},

	render() {
		return (
			<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
				<input type="text" ref="name" placeholder="Fish Name" />
				<input type="text" ref="price" placeholder="Fish Price" />
				<select ref="status">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" ref="desc" placeholder="Desc"></textarea>
				<input type="text" ref="image" placeholder="URL to Image" />
				<button type="submit"> + Add Item </button>
			</form>
		)
	}
});




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
			<div>
				<h2>Inventory</h2>
			{/* ...this.props is called a 'spread' allows you to access all of the props passed down from inventory */}
				<AddFishForm {...this.props}/>
			</div>
		)
	}
});

// StorePicker Component
var StorePicker = React.createClass({

	mixins : [History],

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
	// history allows you to clean up URL and still keep state without the extra generated IDs by Router
	<Router history={ creatBrowserHistory() }>
		<Router path="/" component={ StorePicker }/>
		<Router path="/store/:storeId" component={ App }/>
		<Router path="*" component={ NotFound }/>
	</Router>
)

// Take Routes & depending on the URL it will choose which Route to display as the page
// e.g "/" will take you to the StorePicker
ReactDOM.render(routes, document.querySelector('#main'));