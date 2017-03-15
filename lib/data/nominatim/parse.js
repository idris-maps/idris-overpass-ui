module.exports = function(data) {
	if(data.length === 0) {
		return null
	} else {
		var d = data[0]
		return { lat: d.lat, lng: d.lon }
	}
}
