import {useSelector} from "react-redux";

export const useAuthorization = (allowedRoles) => {
    const user = useSelector((state) => state.auth.user);

    // DEBUG
    if (user === undefined) {
        return false;
    }

    if (user === null) {
        return false;
    }

    if (!Object.keys(user).includes('role')) {
        return true;
    }

    return allowedRoles.includes(user.role);
}

export const useIsAuthenticated = () => {
    const { isLoggedIn } = useSelector(state => state.auth);

    if(isLoggedIn === undefined){
        return false;
    }

    if(isLoggedIn === null){
        return false;
    }

    return isLoggedIn;
}