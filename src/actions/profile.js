import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    SET_MESSAGE,
    GET_ENABLED_PROFILES_SUCCESS,
    GET_DISABLED_PROFILES_SUCCESS
} from './types';

import ProfileService from '../services/ProfileService';
import {MSG_SUCCESS, MSG_WARNING} from "../config";
import {onError} from "./expiration";

export const updateProfile = (name,surname,date,city,address,tel,fiscalCode, cardNumber, cardExpiryDate, cardCvv) => (dispatch) => {
    return ProfileService.updateProfile(name,surname,date,city,address,tel,fiscalCode, cardNumber, cardExpiryDate, cardCvv).then(
        (data) => {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: { profile: data },
            });
            dispatch({
                type: SET_MESSAGE,
                payload: {message: "Profile updated successfully.",
                    type: MSG_SUCCESS},
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
                type: GET_PROFILE_FAIL,
            });

            dispatch(onError(message,"profile"));
            return Promise.reject();
        }
    );

}

export const getProfileData = () => (dispatch) => {
    return ProfileService.getProfile().then(
        (data) => {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: { profile: data },
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
                type: GET_PROFILE_FAIL,
            });

            dispatch(onError(message,"profile"));
            return Promise.reject();
        }
    );
}


export const getAllProfiles = () => (dispatch) => {
    return ProfileService.getProfiles(true).then(
        (data) => {

            dispatch({
                type: GET_ENABLED_PROFILES_SUCCESS,
                payload: {
                    profiles: data?.usersList,
                    enabled: true
                },
            });


            return ProfileService.getProfiles(false).then(
                (disabledData) => {
                    dispatch({
                        type: GET_DISABLED_PROFILES_SUCCESS,
                        payload: {
                            profiles: disabledData?.usersList,
                            enabled: false
                        },
                    });

                    return Promise.resolve();
                },
                () => {
                    return Promise.reject();
                }
            );
        },
        (error) => {

            const message =
                (error.data && error.data.message) ||
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(onError(message,"profile"));
            return Promise.reject();
        }
    );
}

export const disableProfile = (email) => (dispatch) => {
    return ProfileService.disableProfile(email).then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: {message: "Profile disabled successfully.",
                    type: MSG_WARNING},
            });

            dispatch(getAllProfiles());

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

            dispatch(onError(message,"profile"));
            return Promise.reject();
        }
    );
}

export const enableProfile = (email) => (dispatch) => {
    return ProfileService.enableProfile(email).then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: {message: "Profile enabled successfully.",
                    type: MSG_SUCCESS},
            });

            dispatch(getAllProfiles());

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

            dispatch(onError(message,"profile"));
            return Promise.reject();
        }
    );
}