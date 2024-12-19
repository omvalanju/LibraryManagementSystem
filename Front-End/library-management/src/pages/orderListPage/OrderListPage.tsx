import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Backdrop,
} from '@mui/material';
import useOrderListEntity from '../../hooks/useOrderListEntity';
import CustomModal from '../../components/customModal/CustomModal';
import { useState } from 'react';
import OrderEntity from '../../types/orderEntity';

const OrderListPage = () => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    borrowingFunction,
    borrowingFunctionLoading,
    getListRefetch,
  } = useOrderListEntity();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCart, setSelectedCart] = useState<OrderEntity>();
  const handleSubmit = async () => {
    if (!selectedCart) return;
    await borrowingFunction(selectedCart);
    getListRefetch();
  };
  const getNextMonthDate = () => {
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    return nextMonth.toISOString().split('T')[0];
  };
  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={borrowingFunctionLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <CustomModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        modalTitle='Cart Details'
        handleSubmit={handleSubmit}
      >
        <Box>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Author Name</TableCell>
                  <TableCell>Book Title</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Borrow Date</TableCell>
                  <TableCell>Due Date</TableCell>

                  {/* <TableCell>Publisher</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCart?.cartItems.map((book) => (
                  <TableRow
                    key={book.bookId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{book.authorName}</TableCell>
                    <TableCell>{book.bookTitle}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>
                      <input
                        type='date'
                        id='borrowDate'
                        name='borrowDate'
                        defaultValue={new Date().toISOString().split('T')[0]}
                        onChange={(e) => (book.borrowDate = e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type='date'
                        id='dueDate'
                        name='dueDate'
                        defaultValue={getNextMonthDate()}
                        onChange={(e) => (book.dueDate = e.target.value)}
                      />
                    </TableCell>

                    {/* <TableCell>{book.publisher}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CustomModal>
      {getListerror && <Alert color='error'>{getListerror.message}</Alert>}
      {getListisLoading && <CircularProgress />}
      <Box display={'flex'} flexWrap={'wrap'}>
        {getListData?.map((m) => (
          <Card key={m.cartId} sx={{ width: 200 }}>
            <CardContent>
              <Typography gutterBottom sx={{ textAlign: 'center' }}>
                <strong>Full Name:</strong>
                {m.peopleName}
              </Typography>
              <Typography
                gutterBottom
                sx={{ textAlign: 'center' }}
                color='textDisabled'
              >
                <strong>Cart ID:</strong>
                {m.cartId}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                fullWidth
                variant='outlined'
                onClick={() => {
                  setSelectedCart(m);
                  setOpenModal(true);
                }}
              >
                More Detail
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default OrderListPage;
