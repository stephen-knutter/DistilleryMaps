import api from './api';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({type: 'ASYNC_START', subtype: action.type});

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({type: 'ASYNC_END', promise: action.payload});
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        // console.log('ERROR', error.response);
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({type: 'ASYNC_END', promise: action.payload});
        }
        store.dispatch(action);
      }
    );
    return;
  }
  next(action);
}

const localStorageMiddleware = store => next => action => {
  if (action.type === 'REGISTER' || action.type === 'LOGIN') {
    if (!action.error) {
      window.localStorage.setItem('valid', action.payload.user.token);
      api.setToken(action.payload.user.token);
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('valid', '');
    api.setToken(null);
  } else if (action.type === 'SETTING_SAVED' || action.type === 'PHOTO_SAVED') {
    window.localStorage.removeItem('valid');
    window.localStorage.setItem('valid', action.payload.token);
    api.setToken(action.payload.token);
  }
  next(action);
};

function isPromise(func) {
  return func && typeof func.then === 'function';
}

export {promiseMiddleware, localStorageMiddleware}
