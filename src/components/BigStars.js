import React from 'react';

const BigStars = props => {
  if (props.ratings) {
    let ratings = props.ratings[0];
    let totalVotes = 0;
    let totalOfRatings = 0;

    if (ratings) {
      totalVotes = ratings.rating_count ? parseInt(ratings.rating_count) : 0;
      totalOfRatings = ratings.rating_total ? parseInt(ratings.rating_total) : 0;
    }
    
    let finalRating = Math.ceil(totalOfRatings / totalVotes) || 0;
    return(
      <div className="stars-wrap">
        <span className={finalRating >= 1 ? 'fa fa-star' : 'fa fa-star-o'}></span>
        <span className={finalRating >= 2 ? 'fa fa-star' : 'fa fa-star-o'}></span>
        <span className={finalRating >= 3 ? 'fa fa-star' : 'fa fa-star-o'}></span>
        <span className={finalRating >= 4 ? 'fa fa-star' : 'fa fa-star-o'}></span>
        <span className={finalRating >= 5 ? 'fa fa-star' : 'fa fa-star-o'}></span>

        &nbsp;&nbsp;
        <span className="rating-number star-info">{finalRating} Star{finalRating === 1 ? '' : 's'}</span>
        <span className="dash star-info"> / </span>
        <span className="rating-votes star-info">{totalVotes} Vote{totalVotes === 1 ? '' : 's'}</span>
      </div>
    )
  }
  return null;
}

export default BigStars;
