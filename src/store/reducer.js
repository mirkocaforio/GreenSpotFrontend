import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import auth from './auth';
import message from "./message";
import profile from "./profile";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth,
  message,
  profile
});

export default reducer;
