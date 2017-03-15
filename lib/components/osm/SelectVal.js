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
		return (<select onChange={ (e) => this.props.gotVal(multiVals(e.target)) } multiple>
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

function multiVals(select) {
	var r = []
	var opts = select && select.options
	for(var i=0;i<opts.length;i++) {
		if(opts[i].selected) { r.push(opts[i].value) }
	}
	var all = false
	r.forEach(function(d) { if(d === '*') { all = true }})
	if(all) { return '*' }
	else { return r }
}
