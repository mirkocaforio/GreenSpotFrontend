
// project imports

import MinimalLayout from "../layout/MinimalLayout";
import Loadable from "../ui-component/Loadable";
import {lazy} from "react";
const ErrorPage = Loadable(lazy(() => import('../views/error/ErrorPage')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const ErrorRoutes = {
    path: '*',
    element: <MinimalLayout />,
    children:[
        {
            path: '*',
            element: <ErrorPage />
        }
    ]
};

export default ErrorRoutes;
