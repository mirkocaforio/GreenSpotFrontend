import {
    GET_EMAIL_NOTIFICATIONS_SUCCESS,
    GET_EMAIL_NOTIFICATIONS_FAIL,
    GET_POPUP_NOTIFICATIONS_SUCCESS,
    GET_POPUP_NOTIFICATIONS_FAIL,
    SET_MESSAGE
} from "./types";

import NotificationService from "../services/NotificationService";
import {MSG_SUCCESS, MSG_WARNING} from "../config";
import {onError} from "./expiration";

export const getAllEmailNotifications = () => (dispatch) => {
    return NotificationService.getAllEmailNotifications().then(
        (data) => {
            dispatch({
                type: GET_EMAIL_NOTIFICATIONS_SUCCESS,
                payload: { emailNotifications: data },
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
                type: GET_EMAIL_NOTIFICATIONS_FAIL,
            });

            dispatch(onError(message,"notification"));

            return Promise.reject(message);
        }
    );
}

export const getAllPopupNotifications = () => (dispatch) => {
    return NotificationService.getAllPopupNotifications().then(
        (data) => {
            dispatch({
                type: GET_POPUP_NOTIFICATIONS_SUCCESS,
                payload: { popupNotifications: data },
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
                type: GET_POPUP_NOTIFICATIONS_FAIL,
            });

            dispatch(onError(message,"notification"));

            return Promise.reject(message);
        }
    );
}

export const getEmailNotificationByEmail = () => (dispatch) => {
    return NotificationService.getEmailNotificationByEmail().then(
        (data) => {
            dispatch({
                type: GET_EMAIL_NOTIFICATIONS_SUCCESS,
                payload: { emailNotifications: data },
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
                type: GET_EMAIL_NOTIFICATIONS_FAIL,
            });

            dispatch(onError(message,"notification"));

            return Promise.reject(message);
        }
    );
}

export const getPopupNotificationByEmail = () => (dispatch) => {
    return NotificationService.getPopupNotificationByEmail().then(
        (data) => {
            dispatch({
                type: GET_POPUP_NOTIFICATIONS_SUCCESS,
                payload: { popupNotifications: data },
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
                type: GET_POPUP_NOTIFICATIONS_FAIL,
            });

            dispatch(onError(message,"notification"));

            return Promise.reject(message);
        }
    );
}

export const readPopupNotification = (id, read) => (dispatch) => {
    return NotificationService.readPopupNotification(id, read).then(
        (data) => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Notification signed as read",
                    type: MSG_SUCCESS
                },
            });

            dispatch(getPopupNotificationByEmail(false));

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

            dispatch(onError(message,"notification"));

            return Promise.reject(message);
        }
    );
}

export const readAllPopupNotifications = (read) => (dispatch) => {
    return NotificationService.readAllPopupNotifications(read).then(
        (data) => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: read ? "All notifications signed as read" : "All notifications signed as unread",
                    type: MSG_SUCCESS
                },
            });

            dispatch(getPopupNotificationByEmail(false));

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

            dispatch(onError(message,"notification"));

            return Promise.reject(message);
        }
    );
}