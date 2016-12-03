export default (state = {}, action) => {
  switch(action.type) {
    case 'DISTILL_PAGE_LOADED':
     return {
       ...action.payload.distilleryProfile
     };

    case 'DISTILL_PAGE_UNLOADED':
      return {};

    default:
        return state;
  }
}
