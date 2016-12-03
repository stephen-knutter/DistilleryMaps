export default (state = {}, action) => {
  switch(action.type) {
    case 'MAP_PAGE_LOADED':
      return {
        ...action.payload[0].distilleries,
        distillListings: action.payload[1].listings
      };

    case 'MAP_PAGE_UNLOADED':
      return {};

    default:
      return state;
  }
}
