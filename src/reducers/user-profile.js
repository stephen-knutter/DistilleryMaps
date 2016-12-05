export default (state = {}, action) => {
  switch(action.type) {
    case 'PROFILE_PAGE_LOADED':
      return {
        ...action.payload[0].UserProfile,
        ratings: action.payload[1].ratings
      };

    case 'PROFILE_PAGE_UNLOADED':
     return {}

    case 'FOLLOW_USER':
    case 'UNFOLLOW_USER':
      return {
        ...action.payload.UserProfile
      }

    default:
      return state;
  }
}
