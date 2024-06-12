import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import AuthService from "../services/AuthService";
import {MSG_ERROR, MSG_SUCCESS} from "../config";

export const login = (email, password, persist) => (dispatch) => {
    return AuthService.login(email, password, persist).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Logged in!",
                    type: MSG_SUCCESS,
                    location: "login"
                },
            });


            return Promise.resolve();
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
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: message,
                    type: MSG_ERROR,
                    location: "login"
                },
            });

            return Promise.reject(message);
        }
    );
};

export const register = (name,surname,date,city,address,tel,email, password) => (dispatch) => {
    return AuthService.register(name,surname,date,city,address,tel,email, password).then(
        () => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: {message: "You have successfully registered!",
                          type: MSG_SUCCESS,
                          location: "register"
                },
            });

            dispatch(logout());
            return Promise.resolve();
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
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: {message: message,
                          type: MSG_ERROR,
                          location: "register"
                }
            });

            return Promise.reject(message);
        }
    );

}

export const requestRecovery = (email) => (dispatch) => {
    return AuthService.requestRecovery(email).then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: {message:  response ? response.msg : "An email has been sent." ,
                          type: MSG_SUCCESS,
                          location: "recovery"},
            });

            return Promise.resolve();
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
                type: SET_MESSAGE,
                payload: {message: message,
                          type: MSG_ERROR,
                          location: "recovery"}
            });

            return Promise.reject(message);
        }
    );


}

export const resetPassword = (recoverId, password) => (dispatch) => {
    return AuthService.resetPassword(recoverId, password).then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message:  response ? response.msg : "Password has been reset." ,
                    type: MSG_SUCCESS,
                    location: "reset-password"
                },
            });

            return Promise.resolve();
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
                type: SET_MESSAGE,
                payload: {message: message,
                          type: MSG_ERROR,
                          location: "reset-password"
                }
            });

            return Promise.reject(message);
        }
    );
}

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};