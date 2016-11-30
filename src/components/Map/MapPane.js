import React, {Component} from 'react';
import {Link} from 'react-router';

const MapPane = props => {
  const locations = props.locations;

  if (locations) {
    return(
      <ul className="map-link-ul">
        {
          locations.map((location) => {
            return(
              <li className="map-link" key={location.id}>
                <Link to={`/distilleries/${location.slug}`} className="tag-default tag-pill">{location.state}</Link>
              </li>
            )
          })
        }
      </ul>

    )
  } else {
    return(
      <div>Loading...</div>
    )
  }
}

export default MapPane;
