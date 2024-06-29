import {CurrentProfile} from "../services/AuthUtils";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/auth";


export const useAuthorization = (allowedRoles) => {
    const profile = CurrentProfile();
    const dispatch = useDispatch();

    if (allowedRoles === undefined || allowedRoles === null) {
        return true;
    }

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