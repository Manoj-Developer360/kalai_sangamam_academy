import axios from 'axios';
import { clearStoredAuth, getStoredToken } from '../utils/authStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://kalai-sangamam-academy-backend-liard.vercel.app/',
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
    }
    return Promise.reject(error);
  }
);

export default api;
