module.exports = function() {
	var o = this
	
	o.state = {
		canDraw: false,
		drawing: false,
		pt1: null,
		pt2: null,
		circle: L.circleMarker([0,0]),
		rect: L.polygon([[0,0],[1,0],[1,1],[0,1]]),
		bbox: null
	}

	if(o.map) {
		o.map.on('mousedown', function(e) {
			if(o.canDraw) {
				o.map._handlers.forEach(function(handler) { handler.disable() })
				o.state.pt1 = e.latlng
				o.state.pt2 = null
				o.state.drawing = true
				render(o.state, o.map)
			}
		})
		o.map.on('mousemove', function(e) {
			if(o.canDraw) {
				if(o.state.drawing) {
					o.state.pt2 = e.latlng
					render(o.state, o.map)
				}
			}
		})
		o.map.on('mouseup', function(e) {
			if(o.canDraw) {
				o.state.drawing = false
				o.map._handlers.forEach(function(handler) { handler.enable() })
				o.bbox = o.state.rect.getBounds()
			}
		})
	}

}

function render(state, map) {
	if(state.pt1 && !state.pt2) {
		state.circle.setLatLng(state.pt1)
		state.circle.addTo(map)
		state.rect.remove()
	} else if(state.pt1 && state.pt2) {
		state.circle.remove()
		state.rect.setLatLngs(rectCoords(state))
		state.rect.addTo(map)
	}
}

function rectCoords(state) {
	var lat1 = state.pt1.lat
	var lat2 = state.pt2.lat
	var lng1 = state.pt2.lng
	var lng2 = state.pt1.lng
	return [
		[lat1, lng1],
		[lat2, lng1],
		[lat2, lng2],
		[lat1, lng2]
	]
}
