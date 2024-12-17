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
} from '@mui/material';
import useOrderListEntity from '../../hooks/useOrderListEntity';
import CustomModal from '../../components/customModal/CustomModal';
import { useState } from 'react';
import OrderEntity from '../../types/orderEntity';

const OrderListPage = () => {
  const { getListData, getListerror, getListisLoading } = useOrderListEntity();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCart, setSelectedCart] = useState<OrderEntity>();
  const handleSubmit = () => {};
  return (
    <>
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
                {m.peopleName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='small'
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
