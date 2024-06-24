import {GET_ANALYTICS_FAIL, GET_ANALYTICS_SUCCESS, LOGOUT} from "../actions/types";


const initialState = {
    tasksAnalytics: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ANALYTICS_SUCCESS:
            return {
                ...state,
                tasksAnalytics: payload.tasksAnalytics,
            };
        case GET_ANALYTICS_FAIL:
            return {
                ...state,
                tasksAnalytics: state.tasksAnalytics ? state.tasksAnalytics : null,
            };
        case LOGOUT:
            return {
                ...state,
                tasksAnalytics: null,
            };
        default:
            return state;
    }
}