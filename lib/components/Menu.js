import React, { Component } from 'react'
import DrawBbox from './DrawBbox'
import Osm from './Osm'
import GotData from './GotData'
import FindPlace from './FindPlace'
import ReturnedNothing from './ReturnedNothing'
import getOSM from 'idris-overpass-browser'
import map from '../map'

class Menu extends Component {
	constructor() {
		super()
		this.state = {
		}
	}
	event(type, payload) {
		if(type === 'got-bbox') {
			this.setState({ bbox: payload })
		} else if(type === 'got-kv') {
			this.setState({
				key: payload.tag, value: payload.vals, loading: true
			})
			var osmConfig = {
				bbox: this.state.bbox,
				kv: [],
				timeout: 5000
			}
			payload.vals.forEach(function(v) { 
				osmConfig.kv.push({key: payload.tag, value: v }) 
			})
			var ctx = this
			getOSM(osmConfig, function(col) {
				if(col.features.length === 0) { ctx.setState({ returnedNothing: true, loading: false }) }
				else { ctx.setState({ col: col, loading: false }) }
			})
		} else if(type === 'new-search') {
			map.reset()
			this.setState({bbox: undefined, key: undefined, value: undefined, col: undefined })
		}
	}
	whatToRender(state, evt) {
		if(!state.bbox) {
			return (<div>
				<DrawBbox evt={ evt } />
				<br/><hr/><br/>
				<FindPlace />
				<br/>
				<p id="attrib">Data and tiles &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a></p>
			</div>)
		} else if(!state.key || !state.value) {
			return <Osm evt={ evt } />
		} else if(state.loading) {
			return <p>Fetching data from OSM...</p>
		} else if(state.returnedNothing) {
			return <ReturnedNothing evt={ evt } />
		} else if(state.col) {
			return <GotData col={ state.col } evt={ evt } />
		}
	}
 render() {
		return (this.whatToRender(this.state, this.event.bind(this)))
 }
}

export default Menu


