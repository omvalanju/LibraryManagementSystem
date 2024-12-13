import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BookEntityType from '../types/bookEntityType';
const initialState: BookEntityType[] = [];
const basketCartSlice = createSlice({
  name: 'basketCartSlice',
  initialState,
  reducers: {
    addToBasketCart(state, action: PayloadAction<BookEntityType>) {
      state.push(action.payload);
    },
    removeFromBasketCart(state, action: PayloadAction<number>) {
      state.filter((f) => f.bookId !== action.payload);
    },
  },
});
export default basketCartSlice.reducer;
export const { addToBasketCart, removeFromBasketCart } =
  basketCartSlice.actions;
