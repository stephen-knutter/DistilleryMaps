import React from 'react';
import RatingItem from './RatingItem';

const RatingList = props => {
  if (props.ratings) {
    let ratings = props.ratings;
    return(
      <div>
        {
          ratings.map((rating, i) => {
            return(
              <RatingItem key={i} rating={rating} />
            )
          })
        }
      </div>
    )
  }
  return null;
}

export default RatingList;
