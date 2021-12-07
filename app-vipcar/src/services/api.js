import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vendas.vipcarseminovos.com.br/api/v1',
});

export default api;
