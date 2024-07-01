import SettingsService from "../services/SettingsService";
import {onError} from "./expiration";
import {GET_ASSIGNMENT_SETTINGS_SUCCESS, SET_MESSAGE} from "./types";

export const getSettings = () => (dispatch) => {
    return dispatch(getAssignmentSettings());
}

export const getAssignmentSettings = () => (dispatch) => {
    return SettingsService.getAssignmentSettings().then(
        (data) => {

            dispatch({
                type: GET_ASSIGNMENT_SETTINGS_SUCCESS,
                payload: { assignment: data },
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

            dispatch(onError(message,"settings"));
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
                    type: "success"},
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

            dispatch(onError(message,"settings"));
            return Promise.reject();
        }
    );
}