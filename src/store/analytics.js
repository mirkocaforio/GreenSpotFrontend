import {GET_ANALYTICS_FAIL, GET_ANALYTICS_SUCCESS, GET_OVERALL_ANALYTICS_SUCCESS, LOGOUT} from "../actions/types";


const initialState = {
    tasksAnalytics: null,
    overallAnalytics: null
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
                overallAnalytics: state.overallAnalytics ? state.overallAnalytics : null
            };
        case GET_OVERALL_ANALYTICS_SUCCESS:
            return {
                ...state,
                overallAnalytics: payload.overallAnalytics,
            };
        case LOGOUT:
            return {
                ...state,
                tasksAnalytics: null,
                overallAnalytics: null
            };
        default:
            return state;
    }
}