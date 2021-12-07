import axios from 'axios';

let token = null;

const production = 'https://apifacull.msbtec.com.br/api/v1';
const development = 'https://apimaranata.msbtec.com.br/api/v1';

const api = axios.create({
  baseURL: development,
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
  },
);

export function setToken(data) {
  token = data;
}

api.findSuggestions = (url, config) => {
  const { valor, page, idSection, idCategory } = config;

  let apiUrl =
    idSection && idCategory
      ? `${url}/secao/${idSection}/grupo/${idCategory}`
      : url;

  return api.get(apiUrl, {
    params: {
      campo: 'descricao',
      valor,
      'resutados-por-pagina': 30,
      page,
    },
  });
};

export default api;
