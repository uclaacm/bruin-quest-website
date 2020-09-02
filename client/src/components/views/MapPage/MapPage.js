import React, { useState } from "react";

import UCLAMap from './UCLAMap'
import './MapPage.css'


const MapPage = () => {

  const [area, setArea] = useState("")

  return (
      <div className="app">
        <div className="map-view">
          
          <UCLAMap setArea={setArea}/>
      </div>
      </div>


	);
}

export default MapPage;
