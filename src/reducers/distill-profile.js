export default (state = {}, action) => {
  switch(action.type) {
    case 'DISTILL_PAGE_LOADED':
     return {
       ...action.payload[0].distilleryProfile,
       ratings: action.payload[1].ratings,
       userFollowing: action.payload[2].following,
       currentPage: 0
     };

    case 'ADD_RATING':
      state.ratings.unshift(action.payload.rating);
      return {
        ...state
      }

    case 'SET_PAGE':
      return {
        ...state,
        ratings: action.payload.ratings,
        currentPage: action.page
      }


    case 'FAVORITE_DISTILL':
    case 'UNFAVORITE_DISTILL':
      return {
        ...state,
        userFollowing: action.payload.following
      };

    case 'DISTILL_PAGE_UNLOADED':
      return {};

    default:
        return state;
  }
}
