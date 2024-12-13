import useCartEntity from '../../hooks/useCartEntity';
import {
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';
import { Delete } from '@mui/icons-material';

const CartListPage = () => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    updateCartFunction,
    getListRefetch,
  } = useCartEntity();
  const userId = useSelector(
    (state: AppStore) => state.loginSlice.people.peopleId
  );
  const handleDelete = async (bookId: number) => {
    await updateCartFunction({ bookId: bookId, userId: userId });
    getListRefetch();
  };
  return (
    <div>
      <Typography variant='h6' color='initial'>
        Cart Content
      </Typography>
      <hr />
      {getListisLoading && <CircularProgress />}
      {getListerror && (
        <Alert color='error'>
          <strong>{getListerror.code}-</strong>
          {getListerror.message}
        </Alert>
      )}
      {getListData?.length === 0 ? (
        <Typography variant='h4' color='initial'>
          There are no cart items in the cart.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>quantity</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Publisher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getListData?.map((m) => (
                <TableRow
                  key={m.bookId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {m.authorName}
                  </TableCell>
                  <TableCell>{m.bookTitle}</TableCell>
                  <TableCell>
                    {' '}
                    <IconButton onClick={() => handleDelete(m.bookId)}>
                      <Delete />
                    </IconButton>{' '}
                    {m.quantity}
                  </TableCell>
                  <TableCell>{m.isbn}</TableCell>
                  <TableCell>{m.publisher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CartListPage;
