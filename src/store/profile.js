import {GET_PROFILE_SUCCESS, GET_PROFILE_FAIL} from '../actions/types';

const profile = JSON.parse(localStorage.getItem("profile"));

const initialState = profile
    ? { profile }
    : { profile: null };

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
                profile: null,
            };

        default:
            return state;
    }
}