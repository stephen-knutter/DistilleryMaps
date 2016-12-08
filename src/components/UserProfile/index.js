import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import RatingList from './RatingList';
import FavoritesList from './FavoritesList';
import BigStars from '../BigStars';
import api from '../../api';

const EditProfileLink = props => {
  if (props.isUser) {
    return(
      <Link
        to="settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="fa fa-cog" aria-hidden="true"></i> Edit Settings
      </Link>
    );
  }
  return null;
}

const mapStateToProps = state => ({
  profile: state.UserProfile,
  currentUser: state.main.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({type: 'FOLLOW_USER', payload: api.Profile.follow(username)}),
  onUnfollow: username =>
    dispatch({type: 'UNFOLLOW_USER', payload: api.Profile.unfollow(username)}),
  onLoad: payload =>
    dispatch({type: 'PROFILE_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({type: 'PROFILE_PAGE_UNLOADED'})
});

class UserProfile extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      api.UserProfile.findUserBySlug(this.props.params.userslug),
      api.Ratings.getRatingsByUserSlug(this.props.params.userslug),
      api.UserProfile.findUserFavoritesBySlug(this.props.params.userslug)
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;

    if (!profile) {
      return null;
    }

    const isUser =
      this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return(
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row user-row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img
                  src={profile.profile_pic && profile.id ?
                      profile.profile_pic === "user-placeholder.png" ?
                        `/images/${profile.profile_pic}` :
                        `https://distillery-maps-api.herokuapp.com/images/users/${profile.id}/${profile.profile_pic}`
                      : ''}
                  alt={profile.username}
                  className="user-img" />

                  <h2>{profile.username}</h2>
                  <h6>AVERAGE USER RATINGS:</h6>
                  <BigStars ratings={profile.ratings} />

                  <EditProfileLink isUser={isUser} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-3 col-md-3 offset-md-1">

              <h6 className="head-label">FAVORITES</h6>
              <FavoritesList favorites={profile.favorites} />
            </div>
            <div className="col-xs-5 col-md-5">
              <h6 className="head-label">RATINGS</h6>
              <RatingList ratings={profile.ratings} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export {UserProfile, mapStateToProps};
