import React, { Component } from 'react'

class ReturnedNothing extends Component {
	render() {
		return (<div>
			<p>Your search returned nothing.</p>
			<button onClick={ () => this.props.evt('new-search') }>New search</button>
		</div>)
	}
}

export default ReturnedNothing
