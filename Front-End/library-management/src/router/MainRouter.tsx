import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginLayout from '../layouts/loginLayout/LoginLayout';
import LoginPage from '../pages/login/LoginPage';
import appRouter from './appRouter';
import MainLayout from '../layouts/mainLayout/MainLayout';
import HomePage from '../pages/homePage/HomePage';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
const DefaultRoute = () => <Navigate to={appRouter.LOGIN_PAGE} />;

export default MainRouter;
