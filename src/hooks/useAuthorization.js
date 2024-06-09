import {useSelector} from "react-redux";

export const useAuthorization = (allowedRoles) => {
    const user = useSelector((state) => state.auth.user);

    if (user === undefined || user === null) {
        return false;
    }

    // DEBUG
    if (!Object.keys(user).includes('role')) {
        return true;
    }

    return allowedRoles.includes(user.role);
}

export const useIsAuthenticated = () => {
    const { isLoggedIn } = useSelector(state => state.auth);

    if(isLoggedIn === undefined || isLoggedIn === null){
        return false;
    }

    return isLoggedIn;
}