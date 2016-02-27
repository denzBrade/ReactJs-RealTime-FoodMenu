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

// Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://reactjs-foodmenu.firebaseio.com/');

var Catalyst = require('react-catalyst');


// Main App Component
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

	// method to add the fish to the state
	addFish(fish) {
		// can be used to generate a unique ID, it increments each second
		var timestamp = (new Date()).getTime();

		// update the state object by creating a unique ID e.g. 'fish-12345678'
		this.state.fishes['fish-' + timestamp] = fish;

		// set the state (pass it the state object it needs to compare (itself) to enhance performance)
		this.setState({ fishes : this.state.fishes });
	},

	// method to load in JSON file of sample fishes to our 'fishes' state
	loadSamples() {
		this.setState({
			fishes : require('./sample-fishes')
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

				<Order fishes={this.state.fishes} order={this.state.order} />
				{/* Supply addFish as a prop for inventory to access the addFish func */}
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}
					fishes={this.state.fishes} linkState={this.linkState} />
			</div>
		)
	}
})

/*
	Fish
	<Fish />
*/
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

	renderOrder(key) {
		// pass fish data down threw props
		var fish = this.props.fishes[key];
		var count = this.props.order[key];

		// If there is no fish, return message
		if(!fish) {
			return <li key={key}>Sorry fish no longer available!</li>
		}

		return (
			<li key={key}>
				{count}lbs
				{fish.name}
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
				<ul className="order">
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
});

// Inventory Component
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
				<button>Remove Fish</button>
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