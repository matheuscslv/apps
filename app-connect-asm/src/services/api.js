import axios from 'axios';
import store from '~/services/storage';

export const user_service = axios.create({
  //baseURL: 'http://192.168.1.104:3335/api',
  baseURL: 'https://user-service.msbtec.com.br',
});

export const connect_service = axios.create({
  //baseURL: 'http://192.168.1.104:3337',
  baseURL: 'https://connect-service.msbtec.com.br',
});

user_service.interceptors.request.use(
  async config => {
    let token = await store.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

connect_service.interceptors.request.use(
  async config => {
    let token = await store.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
