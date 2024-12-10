import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import styles from './LoginPage.module.css';
import { Login } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import {
  LoginResponseEntityType,
  LoginRequestEntityType,
} from '../../types/loginEntityType';
import apiClient from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import appRouter from '../../router/appRouter';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { loginClient } from '../../features/loginSlice';
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginRequestEntityType>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const handleSubmitForm = (data: LoginRequestEntityType) => {
    apiClient
      .post<LoginResponseEntityType>(
        '/login' + `?email=${data.email}&hashedPassword=${data.password}`
      )
      .then((response) => {
        dispatch(loginClient(response.data));
        navigate(appRouter.BOOK_LIST_PAGE);
      })
      .catch((error) => {
        if (error.status === 401)
          setErrorMessage('username or password is not correct!');
        console.log(error);
      });
  };
  return (
    <Box
      className={styles.loginBox}
      component={'form'}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Box width={'100%'}>
        <Typography variant='h6' color='initial' className='roboto-medium'>
          Login
        </Typography>
        {errorMessage && <Alert color='error'>{errorMessage}</Alert>}
      </Box>
      <Box width={'100%'} textAlign={'center'} my={2}>
        <TextField
          {...register('email', { required: 'email is required.' })}
          error={errors.email?.message ? true : false}
          helperText={errors.email?.message}
          sx={{ display: 'block' }}
          id='email'
          label='email'
          fullWidth
          variant='standard'
        />
      </Box>
      <Box width={'100%'} textAlign={'center'} my={2}>
        <TextField
          {...register('password', { required: 'password is required.' })}
          error={errors.password?.message ? true : false}
          helperText={errors.password?.message}
          sx={{ display: 'block' }}
          id='password'
          type='password'
          variant='standard'
          label='password'
          fullWidth
        />
      </Box>
      <Box width={'100%'} textAlign={'center'} my={2}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          startIcon={<Login />}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
