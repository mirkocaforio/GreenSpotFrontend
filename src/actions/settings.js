import SettingsService from "../services/SettingsService";
import {onError} from "./expiration";
import {
    GET_ASSIGNMENT_SETTINGS_SUCCESS,
    GET_ASSIGNMENT_SETTINGS_FAIL,
    GET_PAYMENT_SETTINGS_SUCCESS,
    GET_PAYMENT_SETTINGS_FAIL,
    SET_MESSAGE
} from "./types";
import {MSG_SUCCESS} from "../config";

export const getSettings = () => (dispatch) => {
    return dispatch(getAssignmentSettings());
}

export const getAssignmentSettings = () => (dispatch) => {
    return SettingsService.getAssignmentSettings().then(
        (data) => {

            dispatch({
                type: GET_ASSIGNMENT_SETTINGS_SUCCESS,
                payload: {assignment: data},
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
                type: GET_ASSIGNMENT_SETTINGS_FAIL,
            });

            dispatch(onError(message, "settings"));
            return Promise.reject(error);
        }
    );
}

export const getPaymentSettings = () => (dispatch) => {
    return SettingsService.getPaymentSettings().then(
        (data) => {
            dispatch({
                type: GET_PAYMENT_SETTINGS_SUCCESS,
                payload: {payment: data},
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
                type: GET_PAYMENT_SETTINGS_FAIL,
            });

            dispatch(onError(message, "settings"));
            return Promise.reject(error);
        }
    );
}

export const setAssignmentSettings = (data) => (dispatch) => {
    return SettingsService.setAssignmentSettings(data).then(
        () => {
            dispatch(getAssignmentSettings());

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Settings updated successfully.",
                    type: MSG_SUCCESS
                },
            })

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

            dispatch(onError(message, "settings"));
            return Promise.reject();
        }
    );
}

export const updatePaymentSettings = (data) => (dispatch) => {
    return SettingsService.updatePaymentSettings(data).then(
        () => {
            dispatch(getPaymentSettings());

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Payment settings updated successfully.",
                    type: MSG_SUCCESS
                },
            })

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

            dispatch(onError(message, "settings"));
            return Promise.reject();
        }
    );
}