

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import {RECOVERY_PATH} from "../config";

const Recovery = Loadable(lazy(() => import('views/pages/pwRecovery/RecoveryRequest')));
const PasswordChange = Loadable(lazy(() => import('views/pages/pwRecovery/RecoverPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: RECOVERY_PATH,
            element: <Recovery />,
         },
        {
            path: RECOVERY_PATH+"/:recoverId",
            element: <PasswordChange/> //Param accessible with " const { recoverId } = useParams();"
        }
    ]
};

export default AuthenticationRoutes;
