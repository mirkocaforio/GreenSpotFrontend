import {lazy} from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RouteGuard from './RouteGuard';
import {ROLE_MEMBER, HOME_PATH, NOTIFICATION_DURATION, ROLE_UTENTE, ROLE_ADMIN} from "../config";
import FetchData from "./FetchData";
import {SnackbarProvider} from "notistack";
import NetworkCheck from "./NetworkCheck";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const ProfilePage = Loadable(lazy(() => import('views/profile')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const WalletPage = Loadable(lazy(() => import('views/wallet')));
const TaskPage = Loadable(lazy(() => import('views/task/TaskCreatePage')));
const TaskManagerPage = Loadable(lazy(() => import("views/task/TaskManagerPage")));
const StorePage = Loadable(lazy(() => import("views/store")));
const ProductPage = Loadable(lazy(() => import("views/store/ProductPage")));
let ResourcePage = Loadable(lazy(() => import('views/resource')));
const StoreManagement = Loadable(lazy(() => import("views/store/management")));
const ProductAdd = Loadable(lazy(() => import("views/store/management/reward")));
const RedeemHistory = Loadable(lazy(() => import("views/store/history")));
const UsersManagement = Loadable(lazy(() => import("views/users-management")));
const Settings = Loadable(lazy(() => import("views/settings")));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <RouteGuard>
                <FetchData>
                    <FetchData type="notification">
                        <SnackbarProvider maxSnack={5} autoHideDuration={NOTIFICATION_DURATION}>
                            <MainLayout/>
                            <NetworkCheck/>
                        </SnackbarProvider>
                    </FetchData>
                </FetchData>
            </RouteGuard>,
    children: [
        {
            path: HOME_PATH,
            element:
                <DashboardDefault/>
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault/>
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography/>
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor/>
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow/>
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage/>
        },
        {
            path: 'profile',
            element: <ProfilePage/>
        },
        {
            path: 'wallet',
            element: <RouteGuard allowedRoles={[ROLE_MEMBER, ROLE_UTENTE]}>
                <FetchData type="wallet">
                    <FetchData type="transactions">
                        <WalletPage/>
                    </FetchData>
                </FetchData>
            </RouteGuard>
        },
        {
            path: 'resource',
            children: [
                {
                    path: 'shared',
                    element: <RouteGuard allowedRoles={[ROLE_MEMBER]}>
                        <FetchData type={"resource"}>
                            <FetchData type={"score_cpu_names"}>
                                <FetchData type={"score_gpu_names"}>
                                    <ResourcePage initialValue={"1"}/>
                                </FetchData>
                            </FetchData>
                        </FetchData>
                    </RouteGuard>
                },
                {
                    path: 'add',
                    element:
                        <RouteGuard allowedRoles={[ROLE_MEMBER]}>
                            <FetchData type={"score_cpu_names"}>
                                <FetchData type={"score_gpu_names"}>
                                    <ResourcePage initialValue={"2"}/>
                                </FetchData>
                            </FetchData>
                        </RouteGuard>
                }
            ]
        },
        {
            path: 'task',
            element: <RouteGuard allowedRoles={[ROLE_UTENTE]}>
                <TaskPage/>
            </RouteGuard>
        },
        {
            path: 'task/list',
            element: <RouteGuard allowedRoles={[ROLE_UTENTE]}>
                <FetchData type="tasks">
                    <FetchData type="taskAnalytics">
                        <TaskManagerPage/>
                    </FetchData>
                </FetchData>
            </RouteGuard>
        }, {
            path: 'store',
            element:
                <RouteGuard allowedRoles={[ROLE_MEMBER]}>
                    <FetchData type="reward">
                        <StorePage/>
                    </FetchData>
                </RouteGuard>
        }, {
            path: 'store/product/:id',
            element: <RouteGuard allowedRoles={[ROLE_MEMBER]}>
                <FetchData type="reward">
                    <ProductPage/>
                </FetchData>
            </RouteGuard>
        }, {
            path: 'store/management',
            element: <RouteGuard allowedRoles={[ROLE_ADMIN]}>
                <FetchData type="reward">
                    <StoreManagement/>
                </FetchData>
            </RouteGuard>
        }, {
            path: 'store/management/:id',
            element: <RouteGuard allowedRoles={[ROLE_ADMIN]}>
                <FetchData type="reward">
                    <ProductAdd/>
                </FetchData>
            </RouteGuard>
        }, {
            path: 'redeem/history',
            element: <RouteGuard allowedRoles={[ROLE_MEMBER]}>
                <FetchData type="redeems">
                    <RedeemHistory/>
                </FetchData>
            </RouteGuard>

        },{
            path: 'users',
            element: <RouteGuard allowedRoles={[ROLE_ADMIN]}>
                        <FetchData type="allProfiles">
                            <UsersManagement/>
                        </FetchData>
                     </RouteGuard>
        },{
                path: 'settings',
            element: <RouteGuard allowedRoles={[ROLE_ADMIN]}>
                        <FetchData type="settings">
                            <Settings/>
                        </FetchData>
                    </RouteGuard>
        }
    ]
};

export default MainRoutes;
