import { Add, Edit, Delete } from '@mui/icons-material';
import {
  CircularProgress,
  Button,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Alert,
  Box,
  TextField,
} from '@mui/material';
import useBookCRUDEntity from '../../hooks/useBookCRUDEntity';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BookEntityType from '../../types/bookEntityType';
import CustomModal from '../../components/customModal/CustomModal';

const BookPage = () => {
  const { getListData, getListerror, getListisLoading } = useBookCRUDEntity();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<'edit' | 'create'>();
  const { register, handleSubmit, reset } = useForm<BookEntityType>();
  const handleSubmitNewBook = async (data: BookEntityType) => {
    //   if (modalState === 'create') await createFunction(data);
    //   if (modalState === 'edit' && selectedEntity) {
    //     data.publisherId = selectedEntity?.publisherId;
    //     await updateFunction(data);
    //   }
    //   getListRefetch();
    //   setOpenAddModal(false);
  };
  return (
    <div>
      {getListerror && <Alert color='error'>{getListerror.message}</Alert>}
      {/* ----------Create modal */}
      <CustomModal
        open={openAddModal}
        handleClose={() => {
          setOpenAddModal(false);
          reset();
        }}
        modalTitle={modalState === 'create' ? 'Add new book' : 'Edit a book'}
      >
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitNewBook)}>
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
      <Typography variant='h6' color='initial'>
        Books
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
              <TableCell>Author Name</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Copies Available</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getListData?.map((m) => (
              <TableRow
                key={m.bookId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{m.authorName}</TableCell>
                <TableCell>{m.bookTitle}</TableCell>
                <TableCell>{m.copiesAvailable}</TableCell>
                <TableCell>{m.isbn}</TableCell>
                <TableCell>{m.publisher.publisherName}</TableCell>
                <TableCell>
                  <IconButton
                    color='secondary'
                    // onClick={() => {
                    //   reset();
                    //   setSelectedEntity(m);
                    //   setModalState('edit');
                    //   setOpenAddModal(true);
                    // }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color='error'
                    // onClick={() => {
                    //   setSelectedEntity(m);
                    //   setOpenDeleteModal(true);
                    // }}
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

export default BookPage;
