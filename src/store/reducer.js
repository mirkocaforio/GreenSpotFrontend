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
import reward from "./reward";
import score from "./score";
import resource from "./resource";
import notification from "./notification";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth,
  message,
  profile,
  resource,
  score,
  wallet,
  transaction,
  tasks,
  analytics,
  reward,
  notification
});

export default reducer;
