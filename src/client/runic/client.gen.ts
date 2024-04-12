// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import axios from 'axios';

export const runicClient = axios.create({
  baseURL: '/api/runic',
});
runicClient.interceptors.request.use(config => {
  config.timeout = 30000;
  return config;
});
runicClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.response?.data?.error && error?.response?.data?.message) {
      return error.response;
    }
    throw new Error('unknown error');
  },
);

export interface Response {
  error: boolean;
  message: string;
  total: number;
}

export interface Setting {
  name: string;
  value: boolean;
}

export interface SettingsBatch {
  ids: string[];
  name: string;
  value: boolean;
}
