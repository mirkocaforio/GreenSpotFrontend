import {
    GET_RESOURCES_SUCCESS,
    GET_RESOURCES_FAIL,
    LOGOUT
} from "../actions/types";

const initialState = {
    resourcesList: null
};

export default function (state = initialState, action) {
const {type, payload} = action;

    switch (type) {
        case GET_RESOURCES_SUCCESS:
            return {
                ...state,
                resourcesList: payload.resourcesList
            };
        case GET_RESOURCES_FAIL:
            return {
                ...state,
                resourcesList: state.resourcesList ? state.resourcesList : null
            };
        case LOGOUT:
            return {
                ...state,
                resourcesList: null,
            };
        default:
            return state;
    }
}