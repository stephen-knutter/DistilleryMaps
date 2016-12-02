import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../api';
import GoogleMap from './GoogleMap';


const mapOptions = {
  lat: 39.739192,
  lng: -104.990147,
};

const mapStateToProps = state => ({
  map: state.map,
  currentUser: state.main.currentUser
});

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({type: 'MAP_PAGE_UNLOADED'}),
  onLoad: payload =>
    dispatch({type: 'MAP_PAGE_LOADED', payload})
});

class Map extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.onLoad(api.Distills.getMapByState(this.props.params.stateslug))
  }

  render() {
    return(
      <div className="map-wrap">
        <GoogleMap mapOptions={this.props.map} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
