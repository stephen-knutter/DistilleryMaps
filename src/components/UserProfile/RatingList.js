import React from 'react';
import RatingItem from './RatingItem';

const RatingList = props => {
  if (props.ratings) {
    let ratings = props.ratings;
    console.log('ratings: ', ratings);
    return(
      <div>
        {
          ratings.map((rating) => {
            return(
              <RatingItem key={rating.comment} rating={rating} />
            )
          })
        }
      </div>
    )
  }
  return null;
}

export default RatingList;
