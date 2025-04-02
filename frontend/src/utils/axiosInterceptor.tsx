import axios from 'axios';
import useAuthStore from '../store/authStore';

axios.defaults.baseURL = 'https://mern-login-system-typescript.onrender.com'; // Ensure this URL is correct
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

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