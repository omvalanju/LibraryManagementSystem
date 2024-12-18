import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../../store/store';
import useBorrowedBookEntity from '../../hooks/useBorrowedBookEntity';
import DebouncedFilter from '../../components/debouncedFilter/DebouncedFilter';
import useBookCRUDEntity from '../../hooks/useBookCRUDEntity';
import { useRef, useState } from 'react';
import BookEntityType from '../../types/bookEntityType';
import BookCard from '../../components/bookCard/BookCard';
import CustomModal from '../../components/customModal/CustomModal';
import { addToBasketCart } from '../../features/basketCartSlice';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<BookEntityType>();
  const quantityInput = useRef<HTMLInputElement>(null);
  const personInfo = useSelector((state: AppStore) => state.loginSlice.people);
  const { getListData } = useBorrowedBookEntity(personInfo.peopleId);
  const { getSearchedBooks, getSearchedBooksLoading } =
    useBookCRUDEntity(false);
  const [searchedData, setSearchedData] = useState<BookEntityType[]>();
  const handleChange = async (value: string) => {
    if (value === '') {
      setSearchedData([]);
      return;
    }
    const result = await getSearchedBooks(value);
    if (result) setSearchedData(result.data);
  };
  const handleBookClicked = (book: BookEntityType) => {
    setSelectedBook(book);
    setOpenModal(true);
  };
  const handleSubmitModal = async () => {
    if (selectedBook && quantityInput.current)
      dispatch(
        addToBasketCart({
          authorName: selectedBook.authorName,
          bookId: selectedBook.bookId,
          bookTitle: selectedBook.bookTitle,
          isbn: selectedBook.isbn,
          publisher: selectedBook.publisher,
          quantity: parseInt(quantityInput.current.value),
          borrowDate: '',
          dueDate: '',
        })
      );
    setOpenModal(false);
  };
  return (
    <Box>
      <CustomModal
        handleClose={() => setOpenModal(false)}
        open={openModal}
        handleSubmit={() => handleSubmitModal()}
        modalTitle='Add to cart'
      >
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Copies</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Publisher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {selectedBook?.authorName}
                </TableCell>
                <TableCell>{selectedBook?.bookTitle}</TableCell>
                <TableCell>{selectedBook?.copiesAvailable}</TableCell>
                <TableCell>{selectedBook?.isbn}</TableCell>
                <TableCell>{selectedBook?.publisher.publisherName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant='subtitle1' color='initial'>
          How many do you nead?
          <input
            ref={quantityInput}
            style={{ textAlign: 'center' }}
            defaultValue={1}
            type='number'
            max={selectedBook?.copiesAvailable}
            min={1}
          />
        </Typography>
      </CustomModal>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        gap={2}
        justifyContent={'center'}
        mb={2}
      >
        <Card sx={{ width: '100%' }}>
          <Typography sx={{ p: 1, bgcolor: 'lightblue' }}>
            Borrowed Books Information
          </Typography>

          <CardContent sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {getListData?.length === 0 && (
              <Typography variant='h6' color='initial'>
                There is no record.
              </Typography>
            )}
            {getListData?.length !== 0 &&
              getListData?.map((m) => (
                <Card key={m.book_id} sx={{ minWidth: 250 }}>
                  <CardContent>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                      <strong>Title:</strong> {m.book_title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                      <strong>Borrow Date:</strong>
                      {m.borrow_date}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      <strong>Fine Status:</strong>
                      {m.fine_status}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      <strong>Fine Amount:</strong>
                      {m.fine_amount}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      </Box>
      <DebouncedFilter
        label='search'
        placeholder='(book title, author, ISBN and publisher name)'
        focused={true}
        onChange={handleChange}
      />
      <Box
        display='flex'
        justifyContent='center'
        flexWrap={'wrap'}
        gap={5}
        mt={3}
      >
        {getSearchedBooksLoading ? (
          <CircularProgress />
        ) : (
          searchedData &&
          searchedData.map((m) => (
            <BookCard
              key={m.bookId}
              BookEntity={m}
              onClick={handleBookClicked}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
