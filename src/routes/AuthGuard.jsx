
import {useIsAuthenticated} from "../hooks/useAuthorization";
import {Navigate} from "react-router-dom";


const ProtectedRoutes = ({children}) => {
    const isLoggedIn = useIsAuthenticated();

    return isLoggedIn ? <Navigate to={"/home"} /> : children;
}

export default ProtectedRoutes;