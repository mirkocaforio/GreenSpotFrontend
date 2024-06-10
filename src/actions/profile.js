import {GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, SET_MESSAGE} from './types';

import ProfileService from '../services/ProfileService';
import {isTokenExpired} from "../services/AuthUtils";
import {logout} from "./auth";


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

            console.error(message);
            dispatch({
                type: GET_PROFILE_FAIL,
            });

            if ( isTokenExpired(message)){
                console.log("Token expired");
                dispatch({
                    type: SET_MESSAGE,
                    payload: "Session expired. Please login again.",
                });

                logout();
            }

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject(message);
        }
    );
}