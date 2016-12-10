import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import store from './store';

import App from './components/App';
import Home from './components/Home/';
import Map from './components/Map';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile/';
import DistillProfile from './components/DistillProfile/';
import Settings from './components/UserProfile/Settings';

ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="distilleries/:abbr/:stateslug" component={Map} />
          <Route path="distilleries/:abbr/:stateslug/:distilleryslug" component={DistillProfile} />
          <Route path="register" component={Register} />
          <Route path="login" component={Login} />
          <Route path="logout" component={Logout} />
          <Route path="settings" component={Settings} />
          <Route path=":userslug" component={UserProfile} />
        </Route>
      </Router>
    </Provider>
), document.getElementById('root'));
