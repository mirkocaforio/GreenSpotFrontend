import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import ErrorRoutes from "./ErrorRoutes";
import RecoverRoutes from "./RecoverRoutes";

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LoginRoutes,RecoverRoutes,MainRoutes, ErrorRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
