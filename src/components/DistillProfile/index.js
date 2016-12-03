import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import GoogleMap from '../Map/GoogleMap';
import api from '../../api';

const FollowUserBtn = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += 'btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return(
    <button
      className={classes}
      onClick={handleClick}>
      <i className="fa fa-plus" aria-hidden="true"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

const mapStateToProps = state => ({
  profile: state.DistillProfile,
  currentUser: state.main.currentUser
});

const mapDispatchToProps = dispatch => ({
  onFavorite: username =>
    dispatch({type: 'FAVORITE_DISTILL', payload: api.Profile.follow(username)}),
  onUnfavorite: username =>
    dispatch({type: 'UNFAVORITE_DISTILL', payload: api.Profile.unfollow(username)}),
  onLoad: payload =>
    dispatch({type: 'DISTILL_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({type: 'DISTILL_PAGE_UNLOADED'})
});

class DistillProfile extends Component {
  componentWillMount() {
    this.props.onLoad(api.Distills.getDistillByDistillId(this.props.params.distilleryslug));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabMenu() {
    return(
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/${this.props.profile.slug}`}>
            Feed
          </Link>
        </li>
      </ul>
    )
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
        <div className="user-info distill-info">
          <GoogleMap
            mapOptions={{map:
                          {
                            slug: this.props.params.stateslug,
                            abbr: this.props.params.abbr,
                            lat: profile.lat,
                            lng: profile.lng,
                            distillListings: [profile]
                          }
                        }}
          />
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1 profile-head-wrap">
                <img
                  src={profile.picture === "distill-placeholder.png" ? `/images/${profile.picture}` : `http://localhost:8000/images/distilleries/${profile.id}/${profile.profile_pic}`}
                  alt={profile.name}
                  className="user-img" />

                  <h2>{profile.name}</h2>

                  
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="feed">
                <div className="articles-toggle">
                  {this.renderTabMenu()}

                  <div className="feed-wrap">
                    <span>Feed here!!</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistillProfile);
export {DistillProfile, mapStateToProps};
