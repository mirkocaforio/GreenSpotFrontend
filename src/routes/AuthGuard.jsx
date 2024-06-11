
import {useIsAuthenticated} from "../hooks/useAuthorization";
import {Navigate} from "react-router-dom";
import {HOME_PATH} from "../config";
import PropTypes from "prop-types";


const ProtectedRoutes = ({children}) => {
    const isLoggedIn = useIsAuthenticated();

    return isLoggedIn ? <Navigate to={HOME_PATH} /> : children;
}

ProtectedRoutes.propTypes = {
    children: PropTypes.node
};

export default ProtectedRoutes;