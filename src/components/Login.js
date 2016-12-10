import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
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
  onSubmit: (email, password) => {
    const payload = api.Auth.login(email, password);
    dispatch({type: 'LOGIN', payload});
  },
  onUnload: () =>
    dispatch({type: 'LOGIN_PAGE_UNLOADED'})
});

class Login extends Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;

    return(
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 form-wrap">
              <h1 className="text-xs-center form-head">Sign in to Distillery Maps!</h1>

              <ErrorsList errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeEmail}/>
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword}/>
                </div>

                <div className="form-foot-wrap">
                  <span>
                    <Link to="register">
                      Create an account &rarr;
                    </Link>
                  </span>

                  <button
                    className="btn btn-lg btn-primary pull-right reg-btn"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign In <i className="fa fa-sign-in" aria-hidden="true"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
