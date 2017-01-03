import React, { Component } from 'react';
import {connect} from 'react-redux';
import api from '../api';
import './App.css';
import Header from './Header';

const mapStateToProps = state => ({
  appLoaded: state.main.appLoaded,
  appName: state.main.appName,
  currentUser: state.main.currentUser,
  redirectTo: state.main.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({type: 'APP_LOAD', payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({type: 'REDIRECT'})
});

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('valid');
    if (token) {
      api.setToken(token);
    }

    this.props.onLoad(token ? api.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return(
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
          {this.props.children}
        </div>
      )
    }
    return(
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
