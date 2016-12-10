import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import api from '../api';
import ErrorsList from './ErrorsList';

const mapStateToProps = state => ({
  ...state.authorization
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({type: 'UPDATE_FIELD_AUTH', key: 'email', value}),
  onChangePassword: value =>
    dispatch({type: 'UPDATE_FIELD_AUTH', key: 'password', value}),
  onChangeUsername: value =>
    dispatch({type: 'UPDATE_FIELD_AUTH', key: 'username', value}),
  onSubmit: (username, email, password) => {
    const payload = api.Auth.register(username, email, password);
    dispatch({type: 'REGISTER', payload});
  },
  onUnload: () =>
    dispatch({type: 'REGISTER_PAGE_UNLOADED'})
})

class Register extends Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return(
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 form-wrap">
              <h1 className="text-xs-center form-head">Sign up for Distillery Maps!</h1>

              <ErrorsList errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={this.props.username}
                    onChange={this.changeUsername}/>
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={this.props.email}
                    onChange={this.changeEmail}/>
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={this.props.password}
                    onChange={this.changePassword}/>
                </div>

                <div className="form-foot-wrap">
                  <span>
                      <Link to="login">
                        Login &rarr;
                      </Link>
                  </span>

                  <button
                    className="btn btn-lg btn-primary pull-right reg-btn"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Register <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
