import React from 'react';
import UCLAMap from './UCLAMap';
import './MapPage.css';

const MapPage = () => {
	return (
		<div className="app">
			<div className="map-view">

				<UCLAMap/>
			</div>
		</div>


	);
};

export default MapPage;
