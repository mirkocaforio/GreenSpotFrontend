import {CurrentProfile} from "../services/AuthUtils";
import {useSelector} from "react-redux";


export const useAuthorization = (allowedRoles) => {
    const profile = CurrentProfile();

    if (profile === undefined || profile === null) {
        return false;
    }

    if (allowedRoles === undefined || allowedRoles === null) {
        return true;
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