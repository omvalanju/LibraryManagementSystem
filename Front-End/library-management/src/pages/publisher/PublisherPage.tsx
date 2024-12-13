import Typography from '@mui/material/Typography';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
  Backdrop,
  IconButton,
} from '@mui/material';
import usePublisherCRUDEntity from '../../hooks/usePublisherCRUDEntity';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';
import CustomModal from '../../components/customModal/CustomModal';
import { useForm } from 'react-hook-form';
import PublisherEntityType from '../../types/publisherEntityType';

const PublisherPage = () => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    getListRefetch,
    deleteFunction,
    deleteFunctionLoading,
    updateFunction,
    updateFunctionLoading,
  } = usePublisherCRUDEntity();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<PublisherEntityType>();
  const [modalState, setModalState] = useState<'edit' | 'create'>();
  const { register, handleSubmit, reset } = useForm<PublisherEntityType>();
  const handleSubmitNewPublisher = async (data: PublisherEntityType) => {
    if (modalState === 'create') await createFunction(data);
    if (modalState === 'edit' && selectedEntity) {
      data.publisherId = selectedEntity?.publisherId;
      await updateFunction(data);
    }
    getListRefetch();
    setOpenAddModal(false);
  };
  const handleDelete = async () => {
    if (!selectedEntity) return;
    await deleteFunction(selectedEntity.publisherId);
    getListRefetch();
    setOpenDeleteModal(false);
  };
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={
          createFunctionLoading ||
          deleteFunctionLoading ||
          updateFunctionLoading
        }
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
        modalTitle='Add new publisher'
      >
        <Box
          component={'form'}
          onSubmit={handleSubmit(handleSubmitNewPublisher)}
        >
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='publisher_name'
            defaultValue={
              modalState === 'edit' ? selectedEntity?.publisherName : ''
            }
            label='Name'
            {...register('publisherName', {
              required: 'Publisher name is required',
            })}
          />
          <TextField
            fullWidth
            size='small'
            sx={{ mb: 2 }}
            id='address'
            defaultValue={modalState === 'edit' ? selectedEntity?.address : ''}
            label='Address'
            {...register('address', {
              required: 'address name is required',
            })}
          />
          <TextField
            fullWidth
            size='small'
            sx={{ mb: 2 }}
            id='email'
            defaultValue={modalState === 'edit' ? selectedEntity?.email : ''}
            type='email'
            label='Email'
            {...register('email', {
              required: 'email name is required',
            })}
          />
          <TextField
            fullWidth
            size='small'
            sx={{ mb: 2 }}
            id='phoneNumber'
            defaultValue={
              modalState === 'edit' ? selectedEntity?.phoneNumber : ''
            }
            label='Phone Number'
            {...register('phoneNumber', {
              required: 'Phone number name is required',
            })}
          />
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
      {/* ----------Delete modal */}
      <CustomModal
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        modalTitle='Delete a publisher'
        handleSubmit={() => handleDelete()}
      >
        <Typography variant='subtitle1' color='initial'>
          Are you sure to delete this item?
        </Typography>
      </CustomModal>
      <Typography variant='h6' color='initial'>
        Publishers
      </Typography>
      <hr />
      <Button
        variant='outlined'
        color='primary'
        startIcon={<Add />}
        onClick={() => {
          setOpenAddModal(true);
          setModalState('create');
        }}
      >
        New
      </Button>
      {getListisLoading && <CircularProgress />}
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Publisher Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getListData?.map((m) => (
              <TableRow
                key={m.publisherId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{m.publisherName}</TableCell>
                <TableCell>{m.phoneNumber}</TableCell>
                <TableCell>{m.address}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>
                  <IconButton
                    color='secondary'
                    onClick={() => {
                      reset();
                      setSelectedEntity(m);
                      setModalState('edit');
                      setOpenAddModal(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setSelectedEntity(m);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PublisherPage;
