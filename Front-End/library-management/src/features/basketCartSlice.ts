import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CartItemEntity from '../types/cartItemEntity';
import { logoutClient } from './loginSlice';
const initialState: CartItemEntity[] = [];
const basketCartSlice = createSlice({
  name: 'basketCartSlice',
  initialState,
  reducers: {
    addToBasketCart(state, action: PayloadAction<CartItemEntity>) {
      state.push(action.payload);
    },
    removeFromBasketCart(state, action: PayloadAction<number>) {
      state.filter((f) => f.bookId !== action.payload);
    },
    clearBasket(state) {
      state.splice(0, state.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutClient, (state) => {
      state.splice(0, state.length);
    });
  },
});
export default basketCartSlice.reducer;
export const { addToBasketCart, removeFromBasketCart, clearBasket } =
  basketCartSlice.actions;
