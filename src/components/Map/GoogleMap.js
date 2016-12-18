import React, {Component} from 'react';
import {connect} from 'react-redux';
import InfoBubble from './Helpers/infoBubble';

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
    if ((nextProps.map.lat && nextProps.map.lng) || (nextProps.mapOptions.map.lat && nextProps.mapOptions.map.lng)) {
      Object.assign(this.state, {
        map: nextProps.mapOptions
      });

      if (Object.keys(this.state.map).length > 0) {
          function bindMarker(marker, map, infoBubble, html) {
            window.google.maps.event.addListener(marker, 'click', function(){
              infoBubble.close();
              infoBubble.setContent(html);
              infoBubble.open(map, marker);
            })
          }

          const centerLat = parseFloat(this.state.map.lat || nextProps.mapOptions.map.lat);
          const centerLng = parseFloat(this.state.map.lng || nextProps.mapOptions.map.lng);

          const mapType = this.props.map.mapType || nextProps.mapOptions.map.mapType;

          const mapOptions = {
            center: new window.google.maps.LatLng(centerLat, centerLng),
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_RIGHT
            },
            streetViewControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_RIGHT
            },
            zoom: mapType === 'distillPage' ? 15 : 8, //8,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            panControl: false
          };

          let map = new window.google.maps.Map(document.getElementById("gmap"), mapOptions);

          const stores = this.props.map.distillListings || nextProps.mapOptions.map.distillListings;
          stores.forEach((store, i) => {
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
              borderColor: 'orange',
              disableAutoPan: true,
              arrowPosition: 50,
              backgroundClassName: 'phoney',
              arrowStyle: 2
            });

            let html =
            `<p class="marker-item distill-name"><a href="/distilleries/${this.state.map.abbr}/${this.state.map.slug}/${store.slug}">${store.name}</a></p>
              <p class="marker-item">
                <a href="http://${store.website}" target="_blank">${store.website}</a>
              </p>
              <p class="marker-item">${store.address} ${store.region}, ${store.state}</p>`;

            let point = new window.google.maps.LatLng({
              lat: parseFloat(store.lat),
              lng: parseFloat(store.lng)
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
