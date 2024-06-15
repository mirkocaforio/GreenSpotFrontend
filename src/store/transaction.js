import {GET_TRANSACTIONS_FAIL, GET_TRANSACTIONS_SUCCESS, LOGOUT} from "../actions/types";

const initialState = {
    transactions: null,
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: payload.transactions,
            };
        case GET_TRANSACTIONS_FAIL:
            return {
                ...state,
                transactions: null,
            };
        case LOGOUT:
            return {
                ...state,
                transactions: null,
            };
        default:
            return state;
    }
}