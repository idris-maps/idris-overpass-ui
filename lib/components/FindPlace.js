import React, { Component } from 'react'
import map from '../map'
import nominatim from '../data/nominatim'

class FindPlace extends Component {
	constructor() {
		super()
		this.state = {
			loading: false,
			place: '',
			noResp: false
		}
	}
	inputChange(e) {
		this.setState({ place: e.target.value })
	}
	btnClick() {
		var ctx = this
		if(this.state.place !== '') {
			this.setState({ loading: true })
			nominatim(this.state.place, function(resp) {
				if(resp === null) {
					ctx.setState({
						loading: false,
						place: '',
						noResp: true
					})
				} else {
					ctx.setState({
						loading: false,
						place: '',
						noResp: false
					})
					map.center(resp)
				}
			})
		}
	}
	render() {
		if(this.state.loading) {
			return (<p>Looking for { this.state.place } ...</p>)
		} else {
			if(this.state.noResp) {
				return (<div>
					<p className="title">Find place</p>
					<p>Could not find the place. Try another.</p>
					<input onChange={ (e) => this.inputChange(e) } placeholder="Search" value={ this.state.place } />
					<button onClick={ () => this.btnClick() }>Search</button>
				</div>)
			} else {
				return (<div>
					<p className="title">Find place</p>
					<input onChange={ (e) => this.inputChange(e) } placeholder="Search" value={ this.state.place } />
					<button onClick={ () => this.btnClick() }>Search</button>
				</div>)
			}
		}
	}
}

export default FindPlace
