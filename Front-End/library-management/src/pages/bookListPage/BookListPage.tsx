import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import useBookCRUDEntity from '../../hooks/useBookCRUDEntity';

const BookListPage = () => {
  const { getListData, getListerror, getListisLoading } = useBookCRUDEntity();
  return (
    <Box display={'flex'} flexWrap={'wrap'} gap={2} justifyContent={'center'}>
      {getListerror && <Alert color='error'>{getListerror.message}</Alert>}
      {getListisLoading && <CircularProgress />}
      {getListData?.map((m) => (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              <strong>Author Name: </strong>
              {m.authorName}
            </Typography>
            <Typography variant='h5' component='div'>
              {m.bookTitle}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              {m.isbn}
            </Typography>
            <Typography variant='body2'>{m.publisher}</Typography>
          </CardContent>
          <CardActions>
            {/* <Button size='small'>Show More</Button> */}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default BookListPage;
