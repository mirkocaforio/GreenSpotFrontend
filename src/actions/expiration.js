import {SET_MESSAGE} from "./types";
import {MSG_ERROR, MSG_WARNING} from "../config";
import {logout} from "./auth";
import {isTokenExpired} from "../services/AuthUtils";

export const onError = (message,location) => (dispatch) => {

    if ( isTokenExpired(message)){
        dispatch({
            type: SET_MESSAGE,
            payload: {message: "Session expired. Please login again.",
                type: MSG_WARNING,
                location: "login"},
        });

        dispatch(logout());
    } else {
        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: message,
                type: MSG_ERROR,
                location: location,
            },
        });
    }

}