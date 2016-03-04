/**
 * Header
 * @type {[Components]}
 */

import React from 'react';

class Header extends React.Component {

	render() {
		// console.log(this.props);
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
}

// PropType Validation, making sure the correct data is passed via props
Header.propTypes = {
	tagline : React.PropTypes.string.isRequired
}

export default Header;