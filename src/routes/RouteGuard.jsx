
import {useIsAuthenticated, useAuthorization} from "../hooks/useAuthorization";
import {Navigate} from "react-router-dom";
import {LOGIN_PATH} from "../config";
import PropTypes from "prop-types";



const RouteGuard = ({allowedRoles, children}) => {
    const isLoggedIn = useIsAuthenticated();
    const isAuthorized = useAuthorization(allowedRoles);

    return isLoggedIn && isAuthorized ? children : <Navigate to={LOGIN_PATH}/>;
}

RouteGuard.propTypes = {
    allowedRoles: PropTypes.array,
    children: PropTypes.node
}

export default RouteGuard;