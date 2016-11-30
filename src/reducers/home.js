export default (state = {}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        distillLocations: action.payload
      }

    case 'HOME_PAGE_UNLOADED':
      return {};

    default:
      return state;
  }
}
