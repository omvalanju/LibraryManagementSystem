import axios from 'axios';
import appRouter from '../router/appRouter';
import store from '../store/store';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});
apiClient.interceptors.request.use((res) => {
  const token = store.getState().loginSlice.token;
  if (token) res.headers.Authorization = `Bearer ${token}`;
  return res;
});
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.status === 401 && !window.location.href.includes('/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = appRouter.LOGIN_PAGE;
    }
    return Promise.reject(error);
  }
);
export default apiClient;
