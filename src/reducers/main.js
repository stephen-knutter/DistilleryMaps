const defaultState = {
  appName: 'Distillery Maps',
  token: null,
  viewChangeCounter: 0
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };

    case 'REDIRECT':
      return {
        ...state,
        redirectTo: null
      };

    case 'LOGOUT':
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      };

    case 'ARTICLE_SUBMITTED':
      const redirectUrl = `article/${action.payload.article.slug}`;
      return {
        ...state,
        redirectTo: redirectUrl
      };

    case 'SETTINGS_SAVED':
    case 'PHOTO_SAVED':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user,
        token: action.error ? null : action.payload.token
      };

    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };

    case 'DELETE_ARTICLE':
      return {
        ...state,
        redirectTo: '/'
      }

    case 'ARTICLE_PAGE_UNLOADED':
    case 'EDITOR_PAGE_UNLOADED':
    case 'HOME_PAGE_UNLOADED':
    case 'PROFILE_PAGE_UNLOADED':
    case 'PROFILE_FAVORITES_PAGE_UNLOADED':
    case 'SETTINGS_PAGE_UNLOADED':
    case 'LOGIN_PAGE_UNLOADED':
    case 'REGISTER_PAGE_UNLOADED':
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1
      };

    default:
      return state;
  }
}
