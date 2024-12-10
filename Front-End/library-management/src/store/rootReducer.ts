import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from '../features/loginSlice';

const rootReducer = combineReducers({
  loginSlice,
});
export default rootReducer;
