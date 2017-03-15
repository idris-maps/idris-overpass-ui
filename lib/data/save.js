var saveAs = require('file-saver').saveAs

module.exports = function(json) {
	var file = new File([JSON.stringify(json)], 'osm-data.json', {type: 'text/plain;charset=utf-8'});
	saveAs(file)
}
