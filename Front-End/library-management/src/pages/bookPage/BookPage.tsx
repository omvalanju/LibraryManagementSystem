import { Add, Edit, Delete } from '@mui/icons-material';
import {
  SelectChangeEvent,
  Alert,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Backdrop,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomModal from '../../components/customModal/CustomModal';
import useBookCRUDEntity from '../../hooks/useBookCRUDEntity';
import usePublisherCRUDEntity from '../../hooks/usePublisherCRUDEntity';
import BookEntityType from '../../types/bookEntityType';

const BookPage = () => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    getListRefetch,
    updateFunction,
    updateFunctionLoading,
    deleteFunction,
    deleteFunctionLoading,
  } = useBookCRUDEntity();
  const { getListData: getPublisherList } = usePublisherCRUDEntity();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<'edit' | 'create'>();
  const [selectedEntity, setSelectedEntity] = useState<BookEntityType>({
    authorName: '',
    bookId: 0,
    bookTitle: '',
    copiesAvailable: 0,
    isbn: '',
    publisher: {
      address: '',
      email: '',
      phoneNumber: '',
      publisherId: 0,
      publisherName: '',
    },
  });
  const { register, handleSubmit, reset, setValue } = useForm<BookEntityType>();

  const handleSubmitNewBook = async (data: BookEntityType) => {
    if (modalState === 'create') await createFunction(data);
    if (modalState === 'edit') {
      data.bookId = selectedEntity.bookId;
      data.publisher = selectedEntity.publisher;
      await updateFunction(data);
    }
    await getListRefetch();
    setOpenAddModal(false);
  };

  const handlePublisherSelect = (e: SelectChangeEvent<string>) => {
    const selectedPublisherId = e.target.value;
    const selectedPublisher = getPublisherList?.find(
      (p) => p.publisherId === parseInt(selectedPublisherId)
    );

    if (selectedPublisher) {
      setSelectedEntity((prev) => ({
        ...prev,
        publisher: selectedPublisher,
      }));
      setValue('publisher', selectedPublisher);
    }
  };
  const handleDelete = async () => {
    if (!selectedEntity) return;
    await deleteFunction(selectedEntity.bookId);
    getListRefetch();
    setOpenDeleteModal(false);
  };
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={
          createFunctionLoading ||
          updateFunctionLoading ||
          deleteFunctionLoading
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
        modalTitle={modalState === 'create' ? 'Add new book' : 'Edit a book'}
      >
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitNewBook)}>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            size='small'
            id='bookTitle'
            defaultValue={
              modalState === 'edit' ? selectedEntity?.bookTitle : ''
            }
            label='Book Title'
            {...register('bookTitle', {
              required: 'Book Title is required',
            })}
          />
          <TextField
            fullWidth
            size='small'
            sx={{ mb: 2 }}
            id='copiesAvailable'
            defaultValue={
              modalState === 'edit' ? selectedEntity?.copiesAvailable : ''
            }
            label='Copies available'
            {...register('copiesAvailable', {
              required: 'Copies available is required',
            })}
          />
          <TextField
            fullWidth
            size='small'
            sx={{ mb: 2 }}
            id='authorName'
            defaultValue={
              modalState === 'edit' ? selectedEntity?.authorName : ''
            }
            label='Author Name'
            {...register('authorName', {
              required: 'Author Name is required',
            })}
          />
          <TextField
            fullWidth
            size='small'
            sx={{ mb: 2 }}
            id='isbn'
            defaultValue={modalState === 'edit' ? selectedEntity?.isbn : ''}
            label='ISBN'
            {...register('isbn', {
              required: 'ISBN is required',
            })}
          />
          {/* Select Publisher */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id='publisher-select-label'>Publisher</InputLabel>
            <Select
              labelId='publisher-select-label'
              id='publisher-select'
              value={
                selectedEntity?.publisher
                  ? String(selectedEntity.publisher.publisherId)
                  : ''
              }
              label='Publisher'
              onChange={handlePublisherSelect}
            >
              {getPublisherList?.map((publisher) => (
                <MenuItem
                  key={publisher.publisherId}
                  value={publisher.publisherId}
                >
                  {publisher.publisherName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            {getListData?.map((book) => (
              <TableRow
                key={book.bookId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{book.authorName}</TableCell>
                <TableCell>{book.bookTitle}</TableCell>
                <TableCell>{book.copiesAvailable}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.publisher.publisherName}</TableCell>
                <TableCell>
                  <IconButton
                    color='secondary'
                    onClick={() => {
                      reset();
                      setSelectedEntity(book);
                      setModalState('edit');
                      setOpenAddModal(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setSelectedEntity(book);
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

export default BookPage;
