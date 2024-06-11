import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import {LOGIN_PATH, REGISTER_PATH} from "../config";
import AuthGuard from "./AuthGuard";

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <AuthGuard>
                <MinimalLayout />
            </AuthGuard>,
  children: [
    {
        path: '/',
        element: <AuthLogin3 />
    },
    {
      path: LOGIN_PATH,
      element: <AuthLogin3 />
    },
    {
      path: REGISTER_PATH,
      element: <AuthRegister3 />
    }
  ]
};

export default AuthenticationRoutes;
