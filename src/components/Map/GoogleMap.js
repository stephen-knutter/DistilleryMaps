import React, {Component} from 'react';
import {connect} from 'react-redux';
import InfoBubble from './Helpers/infoBubble';

const stores = [
    {
      id: 1,
      name: 'Leopold Bros',
      address: '4950 Nome St. Unit E',
      lat: 39.787223,
      lng: -104.851853,
      zip: 80239,
      email: 'sales@leopoldbros.com',
      picture: '',
      phone: '',
      website: 'www.leopoldbros.com',
      region: 'Denver',
      hood: 'dtwn',
      state: 'CO'
    },
    {
      id: 2,
      name: 'Stranahan\'s Colorado Whiskey',
      address: '200 South Kalamath St',
      lat: 39.712539,
      lng: -104.99858,
      zip: 80223,
      email: '',
      picture: '',
      phone: '303-296-7440',
      website: 'www.stranahans.com',
      region: 'Denver',
      hood: 'dtwn',
      state: 'CO'
    },
    {
      id: 3,
      name: 'Colorado Pure Distilling',
      address: '5609 West 6th Ave. Unit C Lakewood, CO ',
      lat: 39.726238,
      lng: -105.058769,
      zip: 80214,
      email: '',
      picture: '',
      phone: '',
      website: 'www.coloradopuredistilling.com',
      region: 'Denver',
      hood: 'dtwn',
      state: 'CO'
    }
  ]


const mapStateToProps = state => ({
  map: state.map,
  currentUser: state.main.currentUser,
});

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      map: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.map.lat && nextProps.map.lng){
      Object.assign(this.state, {
        map: nextProps.mapOptions
      });

      if (Object.keys(this.state.map).length > 0) {
        console.log('state: ', this.state.map);
          function bindMarker(marker, map, infoBubble, html) {
            console.log('adding marker: ', infoBubble);
            window.google.maps.event.addListener(marker, 'click', function(){
              infoBubble.close();
              infoBubble.setContent(html);
              infoBubble.open(map, marker);
            })
          }

          console.log('map: ', this.props.map);
          const centerLat = parseFloat(this.state.map.lat);
          const centerLng = parseFloat(this.state.map.lng);
          console.log('lat: ', centerLat, 'lng: ', centerLng);

          const mapOptions = {
            center: new window.google.maps.LatLng(centerLat, centerLng),
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_RIGHT
            },
            streetViewControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_RIGHT
            },
            zoom: 7,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            panControl: false
          };

          let map = new window.google.maps.Map(document.getElementById("gmap"), mapOptions);

          stores.forEach((store, i) => {
            console.log(store);
            let infoBubble = new InfoBubble({
              map: map,
              backgroundColor: '#ffffff',
              borderRadius: 4,
              maxWidth: 260,
              minWidth: 260,
              maxHeight: 100,
              minHeight: 100,
              arrowSize: 10,
              borderWidth: 2,
              borderColor: '#7BB85C',
              disableAutoPan: true,
              arrowPosition: 50,
              backgroundClassName: 'phoney',
              arrowStyle: 2
            });

            let html = `<p class="marker-item">${store.name}</p><p class="marker-item">${store.address}</p><p class="marker-item">${store.website}</p>`;
            let point = new window.google.maps.LatLng({
              lat: store.lat,
              lng: store.lng
            });

            let marker = new window.google.maps.Marker({
              map: map,
              position: point,
              icon: '/red-marker.png'
            });

            bindMarker(marker, map, infoBubble, html);
          });

      }
    }
  }

  render() {
    return(
      <div id="gmap"></div>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(GoogleMap);
