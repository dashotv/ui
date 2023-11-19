import axios from 'axios';

export const tower = axios.create({
  baseURL: '/api/tower',
});
tower.interceptors.request.use(config => {
  config.timeout = 10000;
  return config;
});
export const scry = axios.create({
  baseURL: '/api/scry',
});
scry.interceptors.request.use(config => {
  config.timeout = 10000;
  return config;
});
export const flame = axios.create({
  baseURL: '/api/flame',
});
flame.interceptors.request.use(config => {
  config.timeout = 10000;
  return config;
});
