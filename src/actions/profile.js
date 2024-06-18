import {GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, SET_MESSAGE} from './types';

import ProfileService from '../services/ProfileService';
import {isTokenExpired} from "../services/AuthUtils";
import {logout} from "./auth";
import {MSG_ERROR, MSG_SUCCESS, MSG_WARNING} from "../config";
import {onError} from "./expiration";

export const updateProfile = (name,surname,date,city,address,tel,fiscalCode,email) => (dispatch) => {
    return ProfileService.updateProfile(name,surname,date,city,address,tel,fiscalCode,email).then(
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