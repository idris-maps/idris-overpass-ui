import React, { Component } from 'react'
import map from '../map'

class DrawBbox extends Component {
	constructor() {
		super()
		this.state = {
			draw: false
		}
	}
	draw() {
		map.drawBbox()
		this.setState({draw: true})
	}
	stop(evt) {
		var bbox = map.stopDraw()
		this.setState({draw: false})
		if(bbox) { evt('got-bbox', bbox) }
	}
	screen(evt) {
		var bbox = map.screenBbox()
		if(bbox) { evt('got-bbox', bbox) }
	}
	whatToRender(draw, evt) {
		if(draw) {
			return (
				<div>
					<p>When the area is drawn...</p>
					<button onClick={ () => this.stop(evt) }>Continue</button>
				</div>
			)
		} else {
			if(map.isTouch()) {
				return (
					<div>
						<p className="title">Select area</p>
						<button onClick={ () => this.screen(evt) }>Visible on screen</button>
					</div>
				)
			} else {
				return (
					<div>
						<p className="title">Select area</p>
						<button onClick={ () => this.screen(evt) }>Visible on screen</button>
						<button onClick={ () => this.draw() }>Draw area</button>
					</div>
				)
			}
		}
	}
 render() {
		return this.whatToRender(this.state.draw, this.props.evt)
  }
}

export default DrawBbox


