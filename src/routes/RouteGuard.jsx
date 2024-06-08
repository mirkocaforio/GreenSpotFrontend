
import {useIsAuthenticated, useAuthorization} from "../hooks/useAuthorization";
import {Navigate} from "react-router-dom";
import {LOGIN_PATH} from "../services/AuthConstants";


const RouteGuard = ({allowedRoles, children}) => {
    const isLoggedIn = useIsAuthenticated();
    const isAuthorized = useAuthorization(allowedRoles);

    return isLoggedIn && isAuthorized ? children : <Navigate to={LOGIN_PATH}/>;
}

export default RouteGuard;