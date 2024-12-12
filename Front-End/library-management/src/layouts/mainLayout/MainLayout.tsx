import { Outlet } from 'react-router-dom';
import HeaderNavbar from '../../components/headerNavbar/HeaderNavbar';
import { Container } from '@mui/material';

const MainLayout = () => {
  return (
    <>
      <HeaderNavbar />
      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
