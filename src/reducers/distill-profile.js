export default (state = {}, action) => {
  switch(action.type) {
    case 'DISTILL_PAGE_LOADED':
     return {
       ...action.payload[0].distilleryProfile,
       ratings: action.payload[1].ratings
     };

    case 'DISTILL_PAGE_UNLOADED':
      return {};

    default:
        return state;
  }
}
