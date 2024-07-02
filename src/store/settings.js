import {
    GET_ASSIGNMENT_SETTINGS_FAIL,
    GET_ASSIGNMENT_SETTINGS_SUCCESS,
    GET_PAYMENT_SETTINGS_FAIL,
    GET_PAYMENT_SETTINGS_SUCCESS,
    LOGOUT
} from "../actions/types";

const initialState = {
    settings: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ASSIGNMENT_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    assignment: payload.assignment,
                },
            };
        case GET_ASSIGNMENT_SETTINGS_FAIL:
            return {
                ...state,
                settings: state.settings ? state.settings : null,
            };
        case GET_PAYMENT_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    payment: payload.payment,
                },
            };
        case GET_PAYMENT_SETTINGS_FAIL:
            return {
                ...state,
                settings: state.settings ? state.settings : null,
            };
        case LOGOUT:
            return {
                ...state,
                settings: null,
            };
        default:
            return state;
    }
}