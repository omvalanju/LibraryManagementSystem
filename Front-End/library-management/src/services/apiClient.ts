import axios from 'axios';
import appRouter from '../router/appRouter';
import store from '../store/store';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
});
apiClient.interceptors.request.use((req) => {
  const token = store.getState().loginSlice.token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response &&
      error.response.status === 407 &&
      !window.location.href.includes('/login')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = appRouter.LOGIN_PAGE;
    }
    return Promise.reject(error);
  }
);
export default apiClient;
