import axios from "axios";
import store from "./storage";

export const rotaDominio = "https://croap.org.br";

const api = axios.create({
  baseURL: `${rotaDominio}/api/v1`
});

/* api.interceptors.request.use(
  async config => {
    try {
      const user = await store.get("User@Profile");
      if (user.token) {
        // eslint-disable-next-line dot-notation
        config.headers["Authorization"] = `${user.token}`;
        return config;
      }
    } catch (e) {
      return config;
    }
  },
  error => Promise.reject(error)
); */

export default api;
