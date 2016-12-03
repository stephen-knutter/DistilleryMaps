import {combineReducers} from 'redux';
import main from './reducers/main';
import home from './reducers/home';
import authorization from './reducers/authorization';
import UserProfile from './reducers/user-profile';
import DistillProfile from './reducers/distill-profile';
import settings from './reducers/settings';
import map from './reducers/map';

export default combineReducers({
  main,
  home,
  authorization,
  UserProfile,
  DistillProfile,
  settings,
  map
});
