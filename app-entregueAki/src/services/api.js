import axios from 'axios';

let token = null;

const production = 'https://api.dahoradelivery.com/api/app/v1';

const api = axios.create({
  baseURL: production,
});

api.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function setToken(data) {
  token = data;
}

export default api;
