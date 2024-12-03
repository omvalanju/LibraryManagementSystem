import { Box, TextField, Button, Typography } from '@mui/material';
import styles from './LoginPage.module.css';
import { Login } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import LoginEntityType from '../../types/loginEntityType';
const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginEntityType>();
  const handleSubmitForm = (data: LoginEntityType) => {
    console.log(data);
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
      </Box>
      <Box width={'100%'} textAlign={'center'} my={2}>
        <TextField
          {...register('username', { required: 'username is required.' })}
          error={errors.username?.message ? true : false}
          helperText={errors.username?.message}
          sx={{ display: 'block' }}
          id='username'
          label='username'
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
