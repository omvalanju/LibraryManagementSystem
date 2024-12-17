import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
  Backdrop,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../../store/store';
import { Check, Delete } from '@mui/icons-material';
import {
  clearBasket,
  removeFromBasketCart,
} from '../../features/basketCartSlice';
import useCartEntity from '../../hooks/useCartEntity';

const CartListPage = () => {
  const cartEntityList = useSelector(
    (state: AppStore) => state.basketCartSlice
  );
  const {
    addMultipleFunction,
    addMultipleIsLoading,
    addMultipleError,
    addMultipleIsError,
  } = useCartEntity();
  const dispatch = useDispatch<AppDispatch>();
  // const userId = useSelector(
  //   (state: AppStore) => state.loginSlice.people.peopleId
  // );
  const handleDelete = async (bookId: number) => {
    dispatch(removeFromBasketCart(bookId));
    // await updateCartFunction({ bookId: bookId, userId: userId });
    // getListRefetch();
  };
  const handleCheckout = async () => {
    await addMultipleFunction(cartEntityList);
    dispatch(clearBasket());
  };
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={addMultipleIsLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {addMultipleIsError && (
        <Alert color='error'>
          Error: {addMultipleError ? String(addMultipleError) : 'Unknown error'}
        </Alert>
      )}
      <Typography variant='h6' color='initial'>
        Cart Content
      </Typography>
      <hr />
      {cartEntityList?.length === 0 ? (
        <Typography variant='h4' color='initial'>
          There are no cart items in the cart.
        </Typography>
      ) : (
        <>
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
                {cartEntityList?.map((m) => (
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
                    <TableCell>{m.publisher.publisherName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box m={2}>
            <Button
              variant='outlined'
              color='error'
              startIcon={<Delete />}
              onClick={() => dispatch(clearBasket())}
            >
              Clear Cart
            </Button>
            <Button
              variant='contained'
              color='success'
              startIcon={<Check />}
              sx={{ mx: 2 }}
              onClick={handleCheckout}
            >
              checkout
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default CartListPage;
