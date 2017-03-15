import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './lib/components/Menu';
import map from './lib/map'

window.onload = function() {
	map.init('map', function() {
		ReactDOM.render(<Menu/>, document.getElementById('menu'))
	})
}

