import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from '../features/loginSlice';
import basketCartSlice from '../features/basketCartSlice';

const rootReducer = combineReducers({
  loginSlice,
  basketCartSlice,
});
export default rootReducer;
