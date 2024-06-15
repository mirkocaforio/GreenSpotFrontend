import TransactionService from "../services/TransactionService";
import {GET_TRANSACTIONS_FAIL, GET_TRANSACTIONS_SUCCESS, SET_MESSAGE} from "./types";
import {isTokenExpired} from "../services/AuthUtils";
import {MSG_ERROR, MSG_WARNING} from "../config";
import {logout} from "./auth";


export const getProfileTransactions = () => (dispatch) => {
    return TransactionService.getTransactions("").then((data) => {

        dispatch({
            type: GET_TRANSACTIONS_SUCCESS,
            payload: { transactions: data },
        });

        return Promise.resolve(data);
    }, (error) => {
        const message =
            (error.data && error.data.message) ||
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: GET_TRANSACTIONS_FAIL,
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
    });
}