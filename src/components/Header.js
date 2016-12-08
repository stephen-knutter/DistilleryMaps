import React, {Component} from 'react';
import {Link} from 'react-router';

const LoggedOutHead = props => {
  if (!props.currentUser) {
    return(
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="fa fa-home" aria-hidden="true"></i> Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="login" className="nav-link">
            <i className="fa fa-sign-in" aria-hidden="true"></i> Sign In
          </Link>
        </li>

        <li className="nav-item">
          <Link to="register" className="nav-link">
            <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up
          </Link>
        </li>
      </ul>
    );
  }
  return null;
}

const LoggedInHead = props => {
  if (props.currentUser) {
    return(
      <ul className="nav navbar-nav pull-xs-right">
        <li className='nav-item'>
          <Link to={`/${props.currentUser.slug}`} className="nav-link">
            <img src={props.currentUser.profile_pic === 'user-placeholder.png' ? `/images/small-${props.currentUser.profile_pic}` : `http://localhost:8000/images/users/${props.currentUser.id}/${props.currentUser.profile_pic}`} className="user-pic" alt={`${props.currentUser.username}`} />
            {props.currentUser.username}
          </Link>
        </li>

        <li className='nav-item'>
          <Link to="" className="nav-link home">
            <i className="fa fa-home" aria-hidden="true"></i> Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link to="settings" className="nav-link settings">
            <i className="fa fa-cog" aria-hidden="true"></i> Settings
          </Link>
        </li>

        <li className='nav-item'>
          <Link to="logout" className="nav-link logout">
             Log Out <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
        </li>
      </ul>
    );
  }
  return null;
}

class Header extends Component {
  constructor() {
    super();

    this.state = {
      hamburgerClick: false
    }

    this.menuClick = ev => {
      let hamburger = document.getElementById("mobileNavbar");
      hamburger.style.className = this.state.hamburgerClick ?
        hamburger.setAttribute("class", "collapse navbar-collapse mobile-navbar") :
        hamburger.setAttribute("class", "collapse navbar-collapse mobile-navbar active");
      this.setState({hamburgerClick: !this.state.hamburgerClick});
    }
  }

  render() {
    return(
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <span className="navbar-white">
              <img src="/distillery-maps-logo.png" className="head-logo" alt="Distillery Maps" />
            </span>
          </Link>

          <LoggedOutHead currentUser={this.props.currentUser} />

          <LoggedInHead currentUser={this.props.currentUser} />

          <button
            type="button"
            id="toggle-btn"
            className="navbar-toggle pull-right"
            data-toggle="collapse"
            data-target="#mobileNavbar"
            onClick={this.menuClick.bind(this)}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>

          <div className="collapse navbar-collapse mobile-navbar" id="mobileNavbar">
            <div className="container">
              <LoggedOutHead currentUser={this.props.currentUser} />
              <LoggedInHead currentUser={this.props.currentUser} />
            </div>
          </div>

        </div>
      </nav>
    )
  }
}

export default Header;
