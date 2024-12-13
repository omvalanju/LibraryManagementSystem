import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import BookEntityType from '../../types/bookEntityType';
interface Props {
  BookEntity: BookEntityType;
  onClick: (book: BookEntityType) => void;
  state?: 'delete' | 'add';
}
const BookCard = ({ BookEntity, onClick, state = 'add' }: Props) => {
  return (
    <Card
      sx={{
        width: 250,
        minHeight: 250,
        borderRadius: '5px',
        background: 'linear-gradient(120deg, #add8e6 50%, white 50%)',
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* شبیه جلد */}
      <Box
        sx={{
          width: '20px',
          height: '100%',
          background: '#1976d240',
          position: 'absolute',
          left: 0,
        }}
      />

      {/* محتویات کارت */}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          px: 2,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            background: '#1976d2',
            padding: '5px 10px',
            borderRadius: '5px',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          {BookEntity.bookTitle}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2, textAlign: 'center' }}>
          Publisher: {BookEntity.publisher}
        </Typography>
        <Typography variant='overline' sx={{ mt: 1, textAlign: 'center' }}>
          Copies:{BookEntity.copiesAvailable}
        </Typography>
        <Button
          variant='outlined'
          color={state === 'add' ? 'primary' : 'error'}
          size='small'
          onClick={() => onClick(BookEntity)}
        >
          {state === 'add' ? 'Add to cart' : 'Remove from cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
