import WalletService from "../services/WalletService";
import {GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, GET_WALLET_FAIL, GET_WALLET_SUCCESS, SET_MESSAGE} from "./types";
import {MSG_ERROR, MSG_SUCCESS, MSG_WARNING} from "../config";
import {isTokenExpired} from "../services/AuthUtils";
import {logout} from "./auth";


export const getWallet = () =>  (dispatch) => {
    return WalletService.getWallet().then(
        (data) => {
            dispatch({
                type: GET_WALLET_SUCCESS,
                payload: { wallet: data },
            });

            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.data && error.data.message) ||
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_WALLET_FAIL,
            });

            if ( isTokenExpired(message)){
                console.log("Token expired");

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
                    },
                });
            }

            return Promise.reject(error);
        }
    );
}