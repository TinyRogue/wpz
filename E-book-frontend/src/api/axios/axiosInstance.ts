import axios from 'axios';
import { api } from '../../static/api';

export const axiosInstance = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
