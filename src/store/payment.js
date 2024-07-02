import {
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
    LOGOUT
} from "../actions/types";

const initialState = {
    invoicesList: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_INVOICES_SUCCESS:
            return {
                ...state,
                invoicesList: payload.invoicesList
            };
        case GET_INVOICES_FAIL:
            return {
                ...state,
                invoicesList: state.invoicesList ? state.invoicesList : null
            };
        case LOGOUT:
            return {
                ...state,
                invoicesList: null,
            };
        default:
            return state;
    }
}