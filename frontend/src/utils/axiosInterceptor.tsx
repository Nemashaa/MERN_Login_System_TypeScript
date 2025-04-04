import axios from 'axios';
import useAuthStore from '../store/authStore';

axios.defaults.baseURL = 'http://localhost:8001'; // Backend URL
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

axios.interceptors.request.use(
  (config) => {
    // Cookies will be sent automatically; no need to manually set Authorization header
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post('/refresh-token', {}, { withCredentials: true }); // Refresh token via cookies
        return axios(originalRequest); // Retry the original request
      } catch (err) {
        console.error('Failed to refresh token:', err);
        const { logout } = useAuthStore.getState();
        logout(); // Log out the user if token refresh fails

        // Redirect to login only if the user is not on a public page
        const publicPages = ['/login', '/register', '/'];
        if (!publicPages.includes(window.location.pathname)) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);