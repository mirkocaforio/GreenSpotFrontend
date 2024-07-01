import {CurrentProfile} from "../services/AuthUtils";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/auth";


export const useAuthorization = (allowedRoles) => {
    const profile = CurrentProfile();
    const dispatch = useDispatch();

    // If no roles are provided, then its a root route and should be accessible to all roles
    if (allowedRoles === undefined || allowedRoles === null) {
        return true;
    }

    // If no profile is found, force logout
    if (profile === undefined || profile === null) {
        dispatch(logout());
        return false;
    }

    return allowedRoles.includes(profile.role);
}

export const useIsAuthenticated = () => {
    const { isLoggedIn } = useSelector(state => state.auth);

    if(isLoggedIn === undefined || isLoggedIn === null){
        return false;
    }

    return isLoggedIn;
}