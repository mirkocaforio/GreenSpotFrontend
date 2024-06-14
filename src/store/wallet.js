import {GET_WALLET_FAIL, GET_WALLET_SUCCESS, LOGOUT} from "../actions/types";

const initialState = {
    wallet: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_WALLET_SUCCESS:
            return {
                ...state,
                wallet: payload.wallet,
            };
        case GET_WALLET_FAIL:
            return {
                ...state,
                wallet: state.wallet ? state.wallet : null,
            };
        case LOGOUT:
            return {
                ...state,
                wallet: null,
            };

        default:
            return state;
    }
}
