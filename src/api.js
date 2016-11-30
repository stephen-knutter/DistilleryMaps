import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_URL = 'https://distillery-maps-api.herokuapp.com';
const LOCALHOST = 'http://localhost:8000';

let token = null;
const tokenHeader = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: uri =>
    superagent.del(`${API_URL}${uri}`).use(tokenHeader).then(res => res.body),
  get: uri =>
    superagent.get(`${LOCALHOST}${uri}`).use(tokenHeader).then(res => res.body),
  put: (uri, body) =>
    superagent.put(`${API_URL}${uri}`, body).use(tokenHeader).then(res => res.body),
  post: (uri, body) =>
    superagent.post(`${LOCALHOST}${uri}`, body).use(tokenHeader).then(res => res.body)
}

const Distills = {
  getAll: () =>
    requests.get('/distills'),
  new: (distillery) =>
    requests.post('/distills/new'),
  create: (distillery) =>
    requests.post('/distills/create'),
  show: (distillery) =>
    requests.get('/distills'+distillery.id),
  edit: (distillery) =>
    requests.put('/distills'+distillery.id+'/edit'),
  delete: (distillery) =>
    requests.del('/distills'+distillery.id)
};

const Auth = {
  login: (email, password) =>
    requests.post('/users/login', {user: {email, password}}),
  register: (username, email, password) =>
    requests.post('/users/register', {user: {username, email, password}}),
  current: () =>
    requests.get('/users/user')
};

export default {
  Distills,
  Auth,
  setToken: _token => {token = _token;}
}
