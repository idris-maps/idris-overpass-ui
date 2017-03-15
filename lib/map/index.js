var map = null
var state = {
	drawing: false,
	pt1: null,
	pt2: null,
	circle: L.circleMarker([0,0]),
	rect: L.polygon([[0,0],[1,0],[1,1],[0,1]]),
	json: L.geoJSON([])
}

var mouseDownHandler = function(e) {
	map._handlers.forEach(function(handler) { handler.disable() })
	state.pt1 = e.latlng
	state.pt2 = null
	state.drawing = true
	render(state)
}
var mouseMoveHandler = function(e) {
	if(state.drawing) {
		state.pt2 = e.latlng
		render(state)
	}
}
var mouseUpHandler = function(e) {
	state.drawing = false
	map._handlers.forEach(function(handler) { handler.enable() })
	state.bbox = boundsToBbox(state.rect.getBounds())
}


exports.init = function(id, callback) {
	map = L.map(id).setView([47.559847,7.589836], 16)
	window.map = map // <--
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map)
	if (L.Browser.touch) { state.touchScreen = true }
	callback()
}

exports.drawBbox = function() {
	map.on('mousedown', mouseDownHandler)
	map.on('mousemove', mouseMoveHandler)
	map.on('mouseup', mouseUpHandler)
}

exports.stopDraw = function() {
	map.off('mousedown', mouseDownHandler)
	map.off('mousemove', mouseMoveHandler)
	map.off('mouseup', mouseUpHandler)
	return state.bbox
}

exports.showGeoJSON = function(col) {
	state.rect.remove()
	col.features.forEach(function(feat) { state.json.addData(feat) })
	state.json.addTo(map)
} 

exports.isTouch = function() {
	if(state.touch) { return true } else { return false }
}

exports.screenBbox = function() {
	return boundsToBbox(map.getBounds())
}

exports.center = function(r) {
	map.setView([r.lat,r.lng], 16)
}

exports.reset = function() {
	state.json.remove()
	state = {
		drawing: false,
		pt1: null,
		pt2: null,
		circle: L.circleMarker([0,0]),
		rect: L.polygon([[0,0],[1,0],[1,1],[0,1]]),
		json: L.geoJSON([])
	}
}

function boundsToBbox(bounds) {
	return [
		bounds._southWest.lng,
		bounds._southWest.lat,
		bounds._northEast.lng,
		bounds._northEast.lat
	]
}

function render(state) {
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

