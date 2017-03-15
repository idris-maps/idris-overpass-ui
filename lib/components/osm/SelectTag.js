import React, { Component } from 'react'
import osm from '../../data/osm'

class SelectTag extends Component {
	list() {
		return osm.map(function(d, i) {
			return <option key={ i } value={ d.key }>{ d.key }</option>
		})
	}
	render() {
		return (<select onChange={ (e) => this.props.gotTag(e.target.value) }>
			<option>-- Choose tag --</option>
			{ this.list() }
		</select>)
	}
}

export default SelectTag
