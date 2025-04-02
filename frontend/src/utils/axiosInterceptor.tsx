import axios from 'axios';
import useAuthStore from '../store/authStore';

axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post<{ accessToken: string }>('/refresh-token', {}, { withCredentials: true });
        if (data.accessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        }
      } catch (err) {
        console.error('Failed to refresh token:', err);
        useAuthStore.getState().logout(); // Log out the user if token refresh fails
      }
    }
    return Promise.reject(error);
  }
);