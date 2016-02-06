var React = require('react');
var ReactDOM = require('react-dom');

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
ReactDOM.render(<StorePicker />, document.querySelector('#main'));