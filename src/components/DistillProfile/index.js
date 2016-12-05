import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import GoogleMap from '../Map/GoogleMap';
import RatingInput from './RatingInput';
import RatingList from './RatingList';
import Products from './Products';
import BigStars from '../BigStars';
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
    this.props.onLoad(Promise.all([
      api.Distills.getDistillByDistillId(this.props.params.distilleryslug),
      api.Ratings.getRatingsByDistillSlug(this.props.params.distilleryslug)
    ]))
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
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="distill-info-container">
            <img
              src={profile.picture === "distill-placeholder.png" ?
                `/images/${profile.picture}` :
                `http://localhost:8000/images/distilleries/${profile.id}/${profile.profile_pic}`}
              alt={profile.name}
              className="user-img distill-img pull-left" />

              <div className="distill-address-info">
                <h2 className="distill-head">{profile.name}</h2>
                <BigStars ratings={profile.ratings} />
              </div>

          </div>
        </div>

        <div className="container col-xs-12 col-md-12 rating-container">
          <div className="row">
            <div className="col-xs-3 col-md-3">
              <h6 className="head-label">BASIC INFO</h6>
              <div className="distill-address">
                <p className="distill-label"><i className="fa fa-phone" aria-hidden="true"></i> {profile.phone}</p>
                <p className="distill-label"><i className="fa fa-globe" aria-hidden="true"></i> <a className="distill-info-link" href={`http://${profile.website}`} target="_blank">{profile.website}</a></p>
                <p className="distill-label"><i className="fa fa-map-marker" aria-hidden="true"></i> {profile.address}<br/>&nbsp;&nbsp;&nbsp;&nbsp;{profile.region}, {profile.state} {profile.zip}</p>
              </div>

              <h6 className="head-label">DISTILLED HERE</h6>
              <div className="distill-products">
                <Products products={profile.products} />
              </div>
            </div>
            <div className="col-xs-5 col-md-5">
              <h6 className="head-label">RATE THIS DISTILLERY</h6>
              <RatingInput currentUser={this.props.currentUser} distill={this.props.profile} />
              <RatingList ratings={this.props.profile.ratings} />
            </div>
          </div>


        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistillProfile);
export {DistillProfile, mapStateToProps};
