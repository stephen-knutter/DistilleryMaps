import React from 'react';

const Stars = props => {
  if (props.rating) {
    let rating = props.rating.rating;
    return(
        <div className="stars">
        {
          <div className="stars-wrap comment-stars">
            <span className="fa fa-star"></span>
            <span className={rating >= 2 ? 'fa fa-star' : 'fa fa-star-o'}></span>
            <span className={rating >= 3 ? 'fa fa-star' : 'fa fa-star-o'}></span>
            <span className={rating >= 4 ? 'fa fa-star' : 'fa fa-star-o'}></span>
            <span className={rating >= 5 ? 'fa fa-star' : 'fa fa-star-o'}></span>

            <span className="rating-comment">{props.rating.comment}</span>

            <p className="rating-date">
              <span>{new Date(props.rating.created_at).toLocaleDateString("en-US")}</span>
            </p>
          </div>
        }
      </div>
    )
  }
  return null;
}

const RatingItem = props => {
  if (props.rating) {
    let rating = props.rating;
    return(
      <div className="card-block rating-wrap article-meta">

        <h5 className="rating-user">
          <img src={
              rating.profile_pic === 'user-placeholder.png' ?
                  '/images/user-placeholder.png' :
                  `https://distillery-maps-api.herokuapp.com/images/users/${rating.user_id}/${rating.profile_pic}`
            }
            alt={rating.username} />
            <span className="rating-user-head"><a href={`/${rating.slug}`}>{rating.username}</a></span>
        </h5>
        <div className="comment-wrap">
          <Stars rating={rating} />
        </div>
      </div>
    )
  }
  return null;
}

export default RatingItem;
