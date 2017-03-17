import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './lib/components/Menu';
import map from './lib/map'

window.onload = function() {
	resizeMap()
	map.init('map', function() {
		ReactDOM.render(<Menu/>, document.getElementById('menu'))
	})
}

window.onresize = function() {
	resizeMap()
}

function resizeMap() {
	var map = document.getElementById('map')
	var h = window.innerHeight
	var headH = 75
	console.log('resize', h, headH, (h - headH) + 'px')
	map.style.height = (h - headH) + 'px'
}

