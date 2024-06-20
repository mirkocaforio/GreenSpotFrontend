import {onError} from "./expiration";
import {GET_ANALYTICS_FAIL, GET_ANALYTICS_SUCCESS} from "./types";
import Analytics from "../services/Analytics";

export const getTasksAnalytics = () => (dispatch) => {
    return Analytics.getUserTasksAnalytics().then((data) => {

        dispatch({
            type: GET_ANALYTICS_SUCCESS,
            payload: {
                tasksAnalytics: data
            }
        });

        return Promise.resolve(data);
    }, (error) => {
        const message =
            (error.data && error.data.message) ||
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: GET_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}