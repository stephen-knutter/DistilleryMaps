import React from 'react';
import './Home.css';

const Banner = ({appName}) => {
  return(
    <div className="banner banner-container">
      <div className="container">
        <div className="lightbox">
          <h1 className="logo-front">
            {appName}
          </h1>
          <p>A place for the liquor connoisseur</p>
        </div>
      </div>
    </div>
  )
}

export default Banner;
