export default (state = {}, action) => {
  switch(action.type) {
    case 'MAP_PAGE_LOADED':
      return {
        ...action.payload.distilleries
      };

    case 'MAP_PAGE_UNLOADED':
      return {};

    default:
      return state;
  }
}
