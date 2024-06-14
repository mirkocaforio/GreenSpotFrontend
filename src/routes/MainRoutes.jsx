import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RouteGuard from './RouteGuard';
import { ROLE_MEMBER, HOME_PATH, NOTIFICATION_DURATION} from "../config";
import FetchData from "./FetchData";
import {SnackbarProvider} from "notistack";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const ProfilePage = Loadable(lazy(() => import('views/profile')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const WalletPage = Loadable(lazy(() => import('views/wallet')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <RouteGuard>
              <FetchData>
                <SnackbarProvider maxSnack={5} autoHideDuration={NOTIFICATION_DURATION}>
                  <MainLayout />
                </SnackbarProvider>
              </FetchData>
            </RouteGuard>,
  children: [
    {
      path: HOME_PATH,
      element:
          <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: 'sample-page',
      element:<SamplePage />
    },
    {
      path: 'profile',
      element: <ProfilePage />
    },
    {
      path: 'wallet',
      element: <RouteGuard allowedRoles={[ROLE_MEMBER]}>
                <FetchData type="wallet">
                  <WalletPage />
                </FetchData>
              </RouteGuard>
    }
  ]
};

export default MainRoutes;
