import WalletService from "../services/WalletService";
import { GET_WALLET_FAIL, GET_WALLET_SUCCESS} from "./types";
import {onError} from "./expiration";


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

            dispatch(onError(message,"wallet"));
            return Promise.reject();
        }
    );
}