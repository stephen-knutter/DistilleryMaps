import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import GoogleMap from '../Map/GoogleMap';
import RatingInput from './RatingInput';
import RatingList from './RatingList';
import Products from './Products';
import BigStars from '../BigStars';
import api from '../../api';

const FavoriteButton = props => {
  if (!props.distill) {
    return null;
  }

  const isFavorite = props.distill.userFollowing;

  const handleClick = ev => {
    ev.preventDefault();
    if (isFavorite) {
      props.unfavorite(props.distill.id);
    } else {
      props.favorite(props.distill.id);
    }
  };

  return(
    <button
      className="btn btn-sm action-btn pull-right favorite-btn"
      onClick={handleClick}>
      {isFavorite ?
        <i className="fa fa-minus-circle" aria-hidden="true"></i> :
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
      }
      &nbsp;
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};

const mapStateToProps = state => ({
  profile: state.DistillProfile,
  currentUser: state.main.currentUser
});

const mapDispatchToProps = dispatch => ({
  onFavorite: distillID =>
    dispatch({type: 'FAVORITE_DISTILL', payload: api.Distills.favorite(distillID)}),
  Unfavorite: distillID =>
    dispatch({type: 'UNFAVORITE_DISTILL', payload: api.Distills.unfavorite(distillID)}),
  onLoad: payload =>
    dispatch({type: 'DISTILL_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({type: 'DISTILL_PAGE_UNLOADED'})
});

class DistillProfile extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      api.Distills.getDistillByDistillSlug(this.props.params.distilleryslug),
      api.Ratings.getRatingsByDistillSlug(this.props.params.distilleryslug),
      api.Distills.getFavoritesByDistillSlug(this.props.params.distilleryslug)
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

                <FavoriteButton
                  distill={profile}
                  favorite={this.props.onFavorite}
                  unfavorite={this.props.Unfavorite}/>

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
                <p className="distill-label">
                  <i className="fa fa-phone distill-icon"
                    aria-hidden="true">
                  </i>
                  {profile.phone}
                </p>

                <p className="distill-label">
                  <i className="fa fa-globe distill-icon"
                    aria-hidden="true">
                  </i>
                  <a className="distill-info-link"
                    href={`http://${profile.website}`}
                    target="_blank">{profile.website}
                  </a>
                </p>

                <p className="distill-label">
                  <i className="fa fa-map-marker distill-icon"
                    aria-hidden="true">
                  </i>
                  {profile.address}
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                  {profile.region}, {profile.state} {profile.zip}
                </p>
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
