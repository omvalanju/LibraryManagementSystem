import { Box, Card, CardContent, Typography } from '@mui/material';
interface Props {
  bookTitle: string;
  publisher: string;
  copies: number;
}
const BookCard = ({ bookTitle, publisher, copies }: Props) => {
  return (
    <Card
      sx={{
        width: 200,
        height: 250,
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
          {bookTitle}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2, textAlign: 'center' }}>
          Publisher: {publisher}
        </Typography>
        <Typography variant='overline' sx={{ mt: 1, textAlign: 'center' }}>
          Copies:{copies}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
