import React, { useState } from "react";

import UCLAMap from './UCLAMap'
import './MapPage.css'


const MapPage = () => {

  const [area, setArea] = useState("")

  return (
    <>
      <div className="app">
        <div className="map-view">
          <div className="map-list">
            <ol>
            <p>Selected Area: {area}</p>
              <li>Royce Hall</li>
              <li>Powell</li>
              <li>Long Bricky Stairs</li>
              <li>Watery Fountain</li>
              <li>Rectangle Bar</li>
            </ol>
          </div>
          
          <UCLAMap setArea={setArea}/>
      </div>
      </div>
      <div style={{ float: "right" }}>
        Thanks For Using This Boiler Plate by John Ahn
			</div>
		</>
	);
}

export default MapPage;
