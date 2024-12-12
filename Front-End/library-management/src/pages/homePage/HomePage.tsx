import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';
import useBorrowedBookEntity from '../../hooks/useBorrowedBookEntity';
import DebouncedFilter from '../../components/debouncedFilter/DebouncedFilter';
import useBookCRUDEntity from '../../hooks/useBookCRUDEntity';
import { useEffect, useState } from 'react';
import BookEntityType from '../../types/bookEntityType';
import BookCard from '../../components/bookCard/BookCard';

const HomePage = () => {
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
  useEffect(() => {
    console.log('Loading status:', getSearchedBooksLoading);
  }, [getSearchedBooksLoading]);
  return (
    <Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        gap={2}
        justifyContent={'center'}
        mb={2}
      >
        {/* <Card sx={{ width: '100%' }}>
          <Typography sx={{ p: 1, bgcolor: 'lightblue' }}>
            User Information
          </Typography>
          <CardContent>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <Typography variant='subtitle1' color='initial'>
                  First Name:
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  Last Name:
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  Addredd:
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  Phone Number:
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  Email:
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  Join Date:
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                <Typography variant='subtitle1' color='initial'>
                  {personInfo.firstName}
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  {personInfo.lastName}
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  {personInfo.address}
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  {personInfo.phoneNumber}
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  {personInfo.email}
                </Typography>
                <Typography variant='subtitle1' color='initial'>
                  {personInfo.joinDate}
                </Typography>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card> */}
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
            {getListData?.map((m) => (
              <Card sx={{ minWidth: 250 }}>
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
              bookTitle={m.bookTitle}
              publisher={m.publisher}
              copies={m.copiesAvailable}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
