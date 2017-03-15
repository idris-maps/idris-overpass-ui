import React, { Component } from 'react'
import osm from '../../data/osm'

class SelectVal extends Component {
	list(tag) {
		var vals = getValues(tag)
		return vals.map(function(d, i) {
			return <option key={ i } value={ d }>{ d }</option>
		})
	}
	render() {
		return (<select onChange={ (e) => this.props.gotVal(e.target.value) }>
			<option>-- Choose value --</option>
			<option value="*">ALL</option>
			{ this.list(this.props.tag) }
		</select>)
	}
}

export default SelectVal

function getValues(tag) {
	var r = null
	osm.forEach(function(d) {
		if(d.key === tag) { r = d.vals }
	})
	return r
}
