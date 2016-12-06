import React from 'react';

const FavoritesList = props => {
  if (!props.favorites) {
    return null;
  }

  const favorites = props.favorites;

  return(
    <div className="favorites-wrap">
      {
        favorites.map((favorite, i) => {
          return(
            <div className="favorite article-meta" key={i}>
              <h5 className="rating-user clearfix">
                <img className="pull-left" src={`/images/${favorite.picture}`} alt={favorite.name} />

                <span className="rating-user-head pull-left">
                  <a href={`/distilleries/${favorite.state.toLowerCase()}/${favorite.state_full.toLowerCase()}/${favorite.slug}`}>{favorite.name}</a>
                  <p className="distill-label">{favorite.address}, {favorite.region}, {favorite.state}</p>
                  <p className="distill-label"></p>
                </span>
              </h5>
            </div>
          )
        })
      }
    </div>
  )
}

export default FavoritesList;
