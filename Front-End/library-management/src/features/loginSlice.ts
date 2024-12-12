import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponseEntityType } from '../types/loginEntityType';
const initialState: LoginResponseEntityType = {
  token: '',
  role: '',
  people: {
    address: '',
    email: '',
    firstName: '',
    joinDate: '',
    lastName: '',
    peopleId: 0,
    phoneNumber: '',
    type: '',
  },
};
const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    loginClient(state, action: PayloadAction<LoginResponseEntityType>) {
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.people.address = action.payload.people.address;
      state.people.email = action.payload.people.email;
      state.people.firstName = action.payload.people.firstName;
      state.people.joinDate = action.payload.people.joinDate;
      state.people.lastName = action.payload.people.lastName;
      state.people.peopleId = action.payload.people.peopleId;
      state.people.phoneNumber = action.payload.people.phoneNumber;
      state.people.type = action.payload.people.type;
    },
    logoutClient(state) {
      state.role = '';
      state.token = '';
      state.people.address = '';
      state.people.email = '';
      state.people.firstName = '';
      state.people.joinDate = '';
      state.people.lastName = '';
      state.people.peopleId = 0;
      state.people.phoneNumber = '';
      state.people.type = '';
    },
  },
});
export const { loginClient, logoutClient } = loginSlice.actions;
export default loginSlice.reducer;
