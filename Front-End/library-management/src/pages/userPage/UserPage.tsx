import { useState } from 'react';
import useUserCRUDEntity from '../../hooks/useUserCRUDEntity';
import { useForm } from 'react-hook-form';
import UserEntityType from '../../types/userEntityType';
import { Add } from '@mui/icons-material';
import {
  Backdrop,
  CircularProgress,
  Alert,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import CustomModal from '../../components/customModal/CustomModal';

const UserPage = () => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    getListRefetch,
  } = useUserCRUDEntity();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<UserEntityType>();

  const handleSubmitNewBook = async (data: UserEntityType) => {
    await createFunction(data);
    await getListRefetch();
    setOpenAddModal(false);
  };
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={createFunctionLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {getListerror && <Alert color='error'>{getListerror.message}</Alert>}
      {/* ----------Create modal */}
      <CustomModal
        open={openAddModal}
        handleClose={() => {
          setOpenAddModal(false);
          reset();
        }}
        modalTitle={'Add new book'}
      >
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitNewBook)}>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='firstName'
            label='First Name'
            {...register('firstName', {
              required: 'First name is required',
            })}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='lastName'
            label='Last Name'
            {...register('lastName', {
              required: 'Last name is required',
            })}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='email'
            type='email'
            label='Email'
            {...register('email', {
              required: 'Email is required',
            })}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='phoneNumber'
            type='number'
            label='Phone Number'
            {...register('phoneNumber', {
              required: 'Phone number is required',
            })}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='hash'
            label='Password'
            {...register('hash', {
              required: 'Password is required',
            })}
          />
          <TextField
            select
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='type'
            label='User Type'
            {...register('type', {
              required: 'User Type is required',
            })}
          >
            <MenuItem value='' disabled>
              Select a type
            </MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='student'>Student</MenuItem>
          </TextField>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='hash'
            rows={4}
            label='Address'
            {...register('address', {
              required: 'Address is required',
            })}
          />
          {/* Select Publisher */}
          <Button type='submit' sx={{ float: 'right' }}>
            Submit
          </Button>
          <Button
            onClick={() => setOpenAddModal(false)}
            sx={{ float: 'right' }}
          >
            Disagree
          </Button>
        </Box>
      </CustomModal>
      <Typography variant='h6' color='initial'>
        Users
      </Typography>
      <hr />
      <Button
        variant='outlined'
        color='primary'
        startIcon={<Add />}
        onClick={() => {
          setOpenAddModal(true);
        }}
      >
        New
      </Button>
      {getListisLoading && <CircularProgress />}
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getListData?.map((user) => (
              <TableRow
                key={user.email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserPage;
