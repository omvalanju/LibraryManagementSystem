import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginLayout from '../layouts/loginLayout/LoginLayout';
import LoginPage from '../pages/login/LoginPage';
import appRouter from './appRouter';
import MainLayout from '../layouts/mainLayout/MainLayout';
import HomePage from '../pages/homePage/HomePage';
import CartListPage from '../pages/cartListPage/CartListPage';
import PublisherPage from '../pages/publisher/PublisherPage';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultRoute />} />
        <Route element={<LoginLayout />}>
          <Route element={<LoginPage />} path={appRouter.LOGIN_PAGE} />
        </Route>
        <Route element={<MainLayout />}>
          <Route element={<HomePage />} path={appRouter.HOME_PAGE} />
          <Route element={<CartListPage />} path={appRouter.CART_PAGE} />
          <Route element={<PublisherPage />} path={appRouter.PUBLISHER_PAGE} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
const DefaultRoute = () => <Navigate to={appRouter.LOGIN_PAGE} />;

export default MainRouter;
