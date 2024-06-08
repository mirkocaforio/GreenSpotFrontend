import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import ErrorRoutes from "./ErrorRoutes";

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LoginRoutes,MainRoutes, ErrorRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
