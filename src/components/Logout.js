import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  ...state.main
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({type: 'LOGOUT'})
});

class Login extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return(
      <span>Logging off...</span>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
