import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponseEntityType } from '../types/loginEntityType';
const initialState = {
  email: '',
  token: '',
  role: '',
};
const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    loginClient(state, action: PayloadAction<LoginResponseEntityType>) {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logoutClient(state) {
      state.email = '';
      state.role = '';
      state.token = '';
    },
  },
});
export const { loginClient, logoutClient } = loginSlice.actions;
export default loginSlice.reducer;
