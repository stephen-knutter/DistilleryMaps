import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Banner from './Banner';
import api from '../../api.js';
import MapPane from '../Map/MapPane';

const mapStateToProps = state => ({
  ...state.home,
  appName: state.main.appName,
  token: state.main.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: 'HOME_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({type: 'HOME_PAGE_UNLOADED'})
});

class Home extends Component {
  componentWillMount() {
    let payload = api.Distills.getAll();
    this.props.onLoad(payload);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return(
      <div className="main-wrap">
        <Banner appName={this.props.appName} />

        <div className="map-link-pane">
          <h1><i className="fa fa-search" aria-hidden="true"></i> Find a Distillery!</h1>

          <MapPane locations={this.props.distillLocations} />
        </div>

      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
