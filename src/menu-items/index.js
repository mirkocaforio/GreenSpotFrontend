import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import wallet from "./wallet";
import task from "./task";
import resource from "./resource";
import reward from "./reward";
import analytics from "./analytics";
import billing from "./billing";
import profile from "./profile";
import store from "./store";

// ==============================|| MENU ITEMS ||============================== //
//TODO: CAMBIARE MAN MANO TUTTI I LINK NEI VARI ITEMS

const menuItems = {
  userItems: [analytics,task, wallet, billing ],
  memberItems: [analytics,resource, reward, wallet],
  adminItems: [analytics,profile, store, dashboard, pages, utilities, other]
};

export default menuItems;
