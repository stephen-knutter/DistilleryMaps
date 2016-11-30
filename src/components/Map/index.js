import React, {Component} from 'react';
import GoogleMap from './GoogleMap';

const mapOptions = {
  lat: 39.739192,
  lng: -104.990147,
};

class Map extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div className="map-wrap">
        <GoogleMap mapOptions={mapOptions} />
      </div>
    )
  }
}

export default Map;
