import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import appRouter from '../../router/appRouter';
import { BookSharp, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutClient } from '../../features/loginSlice';
import { AppDispatch, AppStore } from '../../store/store';

const HeaderNavbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const person = useSelector((state: AppStore) => state.loginSlice.people);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };
  const handleLogout = () => {
    dispatch(logoutClient());
    navigate(appRouter.LOGIN_PAGE);
  };
  return (
    <AppBar position='fixed' sx={{ top: '0px' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Library Management
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='menu'
              color='inherit'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'space-between',
              },
            }}
          >
            <Box>
              <Button
                onClick={() => navigate(appRouter.HOME_PAGE)}
                startIcon={<BookSharp />}
                sx={{
                  my: 2,
                  color: 'white',
                }}
              >
                Book List
              </Button>
            </Box>
            <Button
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                my: 2,
                color: 'white',
              }}
            >
              logout ({person.firstName + ' ' + person.lastName})
            </Button>
          </Box>
        </Toolbar>
      </Container>

      <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton href='/'>
                <ListItemText
                  primary='Book List'
                  onClick={() => navigate(appRouter.HOME_PAGE)}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default HeaderNavbar;
