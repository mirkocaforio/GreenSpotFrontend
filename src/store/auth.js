import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

//const user = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true,hasRegistered: false, user }
    : { isLoggedIn: false,hasRegistered: false, user: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                hasRegistered: true,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                hasRegistered: false,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}