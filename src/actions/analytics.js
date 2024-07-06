import {onError} from "./expiration";
import {
    GET_ANALYTICS_FAIL,
    GET_ANALYTICS_SUCCESS,
    GET_OVERALL_ANALYTICS_SUCCESS, GET_PAYMENT_ADMIN_ANALYTICS_FAIL,
    GET_PAYMENT_ADMIN_ANALYTICS_SUCCESS,
    GET_PAYMENT_USER_ANALYTICS_FAIL,
    GET_PAYMENT_USER_ANALYTICS_SUCCESS,
    GET_TRANSACTION_MEMBER_ANALYTICS_FAIL,
    GET_TRANSACTION_MEMBER_ANALYTICS_SUCCESS,
    GET_TRANSACTION_USER_ANALYTICS_FAIL,
    GET_TRANSACTION_USER_ANALYTICS_SUCCESS
} from "./types";
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

export const getOverallAnalytics = () => (dispatch) => {
    return Analytics.getOverallAnalytics().then((data) => {

        dispatch({
            type: GET_OVERALL_ANALYTICS_SUCCESS,
            payload: {
                overallAnalytics: {
                    all:data
                }
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

export const getOverallAnalyticsDaily = (month, year) => (dispatch) => {
    return Analytics.getOverallAnalyticsDaily(month, year).then((data) => {

        dispatch({
            type: GET_OVERALL_ANALYTICS_SUCCESS,
            payload: {
                overallAnalytics: {
                    daily: {
                        month: month,
                        year: year,
                        data: data
                    }
                }
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

export const getCurrentMonthOverallAnalytics = () => (dispatch) => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return dispatch(getOverallAnalyticsDaily(month, year));
}

export const getTransactionUserAnalytics = (month, year, granularity) => (dispatch) => {
    return Analytics.getTransactionUserAnalytics(month, year, granularity).then((data) => {

        dispatch({
            type: GET_TRANSACTION_USER_ANALYTICS_SUCCESS,
            payload: {
                transactionUserAnalytics: data
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
            type: GET_TRANSACTION_USER_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getTransactionMemberAnalytics = (month, year, granularity) => (dispatch) => {
    return Analytics.getTransactionMemberAnalytics(month, year, granularity).then((data) => {

        dispatch({
            type: GET_TRANSACTION_MEMBER_ANALYTICS_SUCCESS,
            payload: {
                transactionMemberAnalytics: data
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
            type: GET_TRANSACTION_MEMBER_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getPaymentUserAnalytics = (month, year, granularity) => (dispatch) => {
    return Analytics.getPaymentUserAnalytics(month, year, granularity).then((data) => {

        dispatch({
            type: GET_PAYMENT_USER_ANALYTICS_SUCCESS,
            payload: {
                paymentUserAnalytics: data
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
            type: GET_PAYMENT_USER_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getPaymentAdminAnalytics = (month, year, granularity) => (dispatch) => {
    return Analytics.getPaymentAdminAnalytics(month, year, granularity).then((data) => {

        dispatch({
            type: GET_PAYMENT_ADMIN_ANALYTICS_SUCCESS,
            payload: {
                paymentAdminAnalytics: data
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
            type: GET_PAYMENT_ADMIN_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}