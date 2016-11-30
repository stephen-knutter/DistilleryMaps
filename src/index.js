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
import './index.css';

ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="map" component={Map} />
          <Route path="register" component={Register} />
          <Route path="login" component={Login} />
          <Route path="logout" component={Logout} />
        </Route>
      </Router>
    </Provider>
), document.getElementById('root'));
