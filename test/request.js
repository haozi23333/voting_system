// module.exports = {}
import axios from 'axios';

const request = axios.default.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 30000,
});

request.interceptors.response.use(response => response.data, error => Promise.reject(error));

module.exports = request;
