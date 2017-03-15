import React, { Component } from 'react'
import SelectTag from './osm/SelectTag'
import SelectVal from './osm/SelectVal'

class Osm extends Component {
	constructor() {
		super()
		this.state = {}
	}
	gotTag(val) {
		this.setState({ tag: val })
	}
	gotVal(val) {
		this.setState({ vals: val })
	}
	render() {
		if(!this.state.tag) {
			return (<div>
				<p className="title">Tag</p>
				<SelectTag gotTag={ this.gotTag.bind(this) } />
			</div>)
		} else {
			return (<div>
				<p className="title">Tag</p>
				<SelectTag gotTag={ this.gotTag.bind(this) } />
				<p className="title">Values</p>
				<SelectVal gotVal={ this.gotVal.bind(this) } tag={ this.state.tag } />
				<button onClick={ () => this.props.evt('got-kv', this.state) }>Selected</button>
				<button onClick={ () => this.props.evt('got-kv', {tag: this.state.tag, vals: ['*']})}>All</button>
			</div>)
		}
	}

}

export default Osm
