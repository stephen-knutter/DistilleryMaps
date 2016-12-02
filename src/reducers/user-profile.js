export default (state = {}, action) => {
  switch(action.type) {
    case 'PROFILE_PAGE_LOADED':
      return {
        ...action.payload.UserProfile
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
