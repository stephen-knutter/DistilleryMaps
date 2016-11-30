import {combineReducers} from 'redux';
import main from './reducers/main';
import home from './reducers/home';
import authorization from './reducers/authorization';

export default combineReducers({
  main,
  home,
  authorization
});
