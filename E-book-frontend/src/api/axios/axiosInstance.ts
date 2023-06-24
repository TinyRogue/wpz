import axios from 'axios';
import { api } from '../../static/api';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const axiosInstance = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});
