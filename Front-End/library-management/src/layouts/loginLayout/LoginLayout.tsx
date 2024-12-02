import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import styles from './LoginLayout.module.css';
const LoginLayout = () => {
  return (
    <Box className={styles.container}>
      <Outlet />
    </Box>
  );
};

export default LoginLayout;
