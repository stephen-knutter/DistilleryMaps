export default (state = {}, action) => {
  switch(action.type) {
    case 'PROFILE_PAGE_LOADED':
      return {
        ...action.payload[0].UserProfile[0],
        ratings: action.payload[1].ratings,
        favorites: action.payload[2].favorites
      };

    case 'PROFILE_PAGE_UNLOADED':
     return {}

    default:
      return state;
  }
}
