import React, { Component } from 'react'
import map from '../map'
import save from '../data/save'

class GotData extends Component {
	constructor() {
		super()
		this.state = {
			onMap: false
		}
	}
	viewOnMapBtn(col) {
		if(this.state.onMap) { return null }
		else { return (<button onClick={ () => { map.showGeoJSON(col); this.setState({ onMap: true }) }} >
			View on map
			</button>) }
	}
	saveIt(col) {
		save(col)
	}
	render() {
		return (<div>
			<p>Overpass returned { this.props.col.features.length } features</p>
			<button onClick={ () => this.saveIt(this.props.col) }>Download</button>
			{ this.viewOnMapBtn(this.props.col) }
			<button onClick={ () => this.props.evt('new-search') }>New search</button>
		</div>)
	}
}

export default GotData
