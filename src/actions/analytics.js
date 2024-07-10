import {onError} from "./expiration";
import {
    GET_ANALYTICS_FAIL,
    GET_ANALYTICS_SUCCESS,
    GET_MEMBER_ANALYTICS_FAIL,
    GET_MEMBER_ANALYTICS_SUCCESS, GET_MEMBER_LIST_ANALYTICS_FAIL, GET_MEMBER_LIST_ANALYTICS_SUCCESS,
    GET_OVERALL_ANALYTICS_FAIL,
    GET_OVERALL_ANALYTICS_SUCCESS,
    GET_PAYMENT_ADMIN_ANALYTICS_FAIL,
    GET_PAYMENT_ADMIN_ANALYTICS_SUCCESS,
    GET_PAYMENT_USER_ANALYTICS_FAIL,
    GET_PAYMENT_USER_ANALYTICS_SUCCESS,
    GET_TRANSACTION_MEMBER_ANALYTICS_FAIL,
    GET_TRANSACTION_MEMBER_ANALYTICS_SUCCESS,
    GET_TRANSACTION_USER_ANALYTICS_FAIL,
    GET_TRANSACTION_USER_ANALYTICS_SUCCESS,
    GET_USER_ANALYTICS_FAIL,
    GET_USER_ANALYTICS_SUCCESS, GET_USER_LIST_ANALYTICS_FAIL,
    GET_USER_LIST_ANALYTICS_SUCCESS
} from "./types";
import Analytics from "../services/Analytics";

export const getUserAnalytics = () => (dispatch) => {
    return Analytics.getUserAnalytics().then((data) => {

        dispatch({
            type: GET_USER_ANALYTICS_SUCCESS,
            payload: {
                userAnalytics: data
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
            type: GET_USER_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getUserFilterAnalytics = (startDate, endDate) => (dispatch) => {
    return Analytics.getUserFilterAnalytics(startDate, endDate).then((data) => {

        dispatch({
            type: GET_USER_ANALYTICS_SUCCESS,
            payload: {
                userAnalytics: data
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
            type: GET_USER_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getUserListAnalytics = (month, year, granularity) => (dispatch) => {
    return Analytics.getUserListAnalytics(month, year, granularity).then((data) => {

        dispatch({
            type: GET_USER_LIST_ANALYTICS_SUCCESS,
            payload: {
                userListAnalytics: data
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
            type: GET_USER_LIST_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

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

export const getMemberAnalytics = () => (dispatch) => {
    return Analytics.getMemberAnalytics().then((data) => {

        dispatch({
            type: GET_MEMBER_ANALYTICS_SUCCESS,
            payload: {
                memberAnalytics: data
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
            type: GET_MEMBER_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getMemberFilterAnalytics = (startDate, endDate) => (dispatch) => {
    return Analytics.getMemberFilterAnalytics(startDate, endDate).then((data) => {

        dispatch({
            type: GET_MEMBER_ANALYTICS_SUCCESS,
            payload: {
                memberAnalytics: data
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
            type: GET_MEMBER_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getMemberListAnalytics = (month, year, granularity) => (dispatch) => {
    return Analytics.getMemberListAnalytics(month, year, granularity).then((data) => {

        dispatch({
            type: GET_MEMBER_LIST_ANALYTICS_SUCCESS,
            payload: {
                memberListAnalytics: data
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
            type: GET_MEMBER_LIST_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });

}

export const initMemberListAnalytics = () => (dispatch) => {
    const date = new Date();
    const month = date.getMonth() - 1;
    const year = date.getFullYear();
    const granularity = "month";
    return dispatch(getMemberListAnalytics(month, year, granularity));
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
            type: GET_OVERALL_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getOverallFilterAnalytics = (startDate, endDate) => (dispatch) => {
    return Analytics.getOverallAnalyticsByDate(startDate, endDate).then((data) => {

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
            type: GET_OVERALL_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });

}

export const getOverallAnalyticsList = (month, year, granularity) => (dispatch) => {
    return Analytics.getOverallAnalyticsDaily(month, year, granularity).then((data) => {

        dispatch({
            type: GET_OVERALL_ANALYTICS_SUCCESS,
            payload: {
                overallAnalytics: {
                    [granularity]: {
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
            type: GET_OVERALL_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const getCurrentMonthOverallAnalytics = () => (dispatch) => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const granularity = "day";
    return dispatch(getOverallAnalyticsList(month, year, granularity));
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

export const initTransactionMemberAnalytics = () => (dispatch) => {
    const date = new Date();
    const month = date.getMonth() - 1;
    const year = date.getFullYear();
    const granularity = "month";
    return dispatch(getTransactionMemberAnalytics(month, year, granularity));
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
                paymentAdminAnalytics: {
                    [granularity]: {
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
            type: GET_PAYMENT_ADMIN_ANALYTICS_FAIL
        })

        dispatch(onError(message,"analytics"));
        return Promise.reject();
    });
}

export const initPaymentAdminAnalytics = () => (dispatch) => {
    const date = new Date();
    const month = date.getMonth() - 1;
    const year = date.getFullYear();
    const granularity = "month";
    return dispatch(getPaymentAdminAnalytics(month, year, granularity));
}