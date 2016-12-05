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
    superagent.put(`${LOCALHOST}${uri}`, body).use(tokenHeader).then(res => res.body),
  post: (uri, body) =>
    superagent.post(`${LOCALHOST}${uri}`, body).use(tokenHeader).then(res => res.body),
  postfile: (uri, files) =>
    superagent.post(`${LOCALHOST}${uri}`).use(tokenHeader).send(files).then(res => res.body)
}

const Distills = {
  getAll: () =>
    requests.get('/distills'),
  getMapByState: (state) =>
    requests.get(`/distills/${state}`),
  getDistillsByState: (stateAbbr) =>
    requests.get(`/distills/all/${stateAbbr}`),
  getDistillByDistillId: (distillSlug) =>
    requests.get(`/distills/distill/${distillSlug}`)
};

const Auth = {
  login: (email, password) =>
    requests.post(`/users/login`, {user: {email, password}}),
  register: (username, email, password) =>
    requests.post(`/users/register`, {user: {username, email, password}}),
  current: () =>
    requests.get(`/users/user`),
  save: (user) =>
    requests.put(`/users/update`, user),
  savePhoto: (files) =>
    requests.postfile(`/users/photo`, files)
};

const UserProfile = {
  findUserBySlug: (userslug) =>
    requests.get(`/users/profile/${userslug}`),
};

const Ratings = {
  addRating: (ratingInfo) =>
    requests.post(`/ratings/new`, ratingInfo),
  getRatingsByDistillSlug: (distillSlug) =>
    requests.get(`/ratings/distills/${distillSlug}`),
  getRatingsByUserSlug: (userSlug) =>
    requests.get(`/ratings/users/${userSlug}`)
}

export default {
  Distills,
  Auth,
  UserProfile,
  Ratings,
  setToken: _token => {token = _token;}
};
