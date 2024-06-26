import {
    GET_EMAIL_NOTIFICATIONS_SUCCESS,
    GET_EMAIL_NOTIFICATIONS_FAIL,
    GET_POPUP_NOTIFICATIONS_SUCCESS,
    GET_POPUP_NOTIFICATIONS_FAIL,
    LOGOUT
} from "../actions/types";

const initialState = {
    emailNotifications: null,
    popupNotifications: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_EMAIL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                emailNotifications: payload.emailNotifications,
            };
        case GET_EMAIL_NOTIFICATIONS_FAIL:
            return {
                ...state,
                emailNotifications: state.emailNotifications ? state.emailNotifications : null,
            };
        case GET_POPUP_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                popupNotifications: payload.popupNotifications,
            };
        case GET_POPUP_NOTIFICATIONS_FAIL:
            return {
                ...state,
                popupNotifications: state.popupNotifications ? state.popupNotifications : null,
            };
        case LOGOUT:
            return {
                emailNotifications: null,
                popupNotifications: null
            };
        default:
            return state;
    }
}