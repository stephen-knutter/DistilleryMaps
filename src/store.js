import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';
import {promiseMiddleware, localStorageMiddleware} from './middleware';
import reducer from './reducer';

const runMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware, localStorageMiddleware);
  }
  return applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger());
}

const store = createStore(reducer, runMiddleware());

export default store;
