import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    LOGOUT,
    GET_ENABLED_PROFILES_SUCCESS,
    GET_DISABLED_PROFILES_SUCCESS
} from '../actions/types';

const profile = JSON.parse(localStorage.getItem("profile"));

const initialState = profile
    ? { profile, profiles: null }
    : { profile: null, profiles: null};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
            };
        case GET_PROFILE_FAIL:
            return {
                ...state,
                profile: profile || null,
            };
        case GET_ENABLED_PROFILES_SUCCESS:
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    enabled: payload.profiles,
                }
            };
        case GET_DISABLED_PROFILES_SUCCESS:
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    disabled: payload.profiles,
                }
            };
        case LOGOUT:
            return {
                ...state,
                profile: null,
                profiles: null,
            };

        default:
            return state;
    }
}