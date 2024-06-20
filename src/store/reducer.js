import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import auth from './auth';
import message from "./message";
import profile from "./profile";
import wallet from "./wallet";
import transaction from "./transaction";
import tasks from "./tasks";
import analytics from "./analytics";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth,
  message,
  profile,
  wallet,
  transaction,
  tasks,
  analytics
});

export default reducer;
