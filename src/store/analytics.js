import {
    GET_ANALYTICS_FAIL,
    GET_ANALYTICS_SUCCESS,
    GET_OVERALL_ANALYTICS_SUCCESS, GET_PAYMENT_ADMIN_ANALYTICS_FAIL,
    GET_PAYMENT_ADMIN_ANALYTICS_SUCCESS, GET_PAYMENT_USER_ANALYTICS_FAIL,
    GET_PAYMENT_USER_ANALYTICS_SUCCESS, GET_TRANSACTION_MEMBER_ANALYTICS_FAIL,
    GET_TRANSACTION_MEMBER_ANALYTICS_SUCCESS, GET_TRANSACTION_USER_ANALYTICS_FAIL,
    GET_TRANSACTION_USER_ANALYTICS_SUCCESS,
    LOGOUT
} from "../actions/types";


const initialState = {
    tasksAnalytics: null,
    overallAnalytics: null,
    transactionUserAnalytics: null,
    transactionMemberAnalytics: null,
    paymentUserAnalytics: null,
    paymentAdminAnalytics: null
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
                overallAnalytics: {
                    ...state.overallAnalytics,
                    ...payload.overallAnalytics
                },
            };
        case GET_TRANSACTION_USER_ANALYTICS_SUCCESS:
            return {
                ...state,
                transactionUserAnalytics: payload.transactionUserAnalytics,
            };
        case GET_TRANSACTION_USER_ANALYTICS_FAIL:
            return {
                ...state,
                transactionUserAnalytics: state.transactionUserAnalytics ? state.transactionUserAnalytics : null
            };
        case GET_TRANSACTION_MEMBER_ANALYTICS_SUCCESS:
            return {
                ...state,
                transactionMemberAnalytics: payload.transactionMemberAnalytics,
            };
        case GET_TRANSACTION_MEMBER_ANALYTICS_FAIL:
            return {
                ...state,
                transactionMemberAnalytics: state.transactionMemberAnalytics ? state.transactionMemberAnalytics : null
            };
        case GET_PAYMENT_USER_ANALYTICS_SUCCESS:
            return {
                ...state,
                paymentUserAnalytics: payload.paymentUserAnalytics,
            };
        case GET_PAYMENT_USER_ANALYTICS_FAIL:
            return {
                ...state,
                paymentUserAnalytics: state.paymentUserAnalytics ? state.paymentUserAnalytics : null
            };
        case GET_PAYMENT_ADMIN_ANALYTICS_SUCCESS:
            return {
                ...state,
                paymentAdminAnalytics: payload.paymentAdminAnalytics,
            };
        case GET_PAYMENT_ADMIN_ANALYTICS_FAIL:
            return {
                ...state,
                paymentAdminAnalytics: state.paymentAdminAnalytics ? state.paymentAdminAnalytics : null
            };
        case LOGOUT:
            return {
                ...state,
                tasksAnalytics: null,
                overallAnalytics: null,
                transactionUserAnalytics: null,
                transactionMemberAnalytics: null,
                paymentUserAnalytics: null,
                paymentAdminAnalytics: null
            };
        default:
            return state;
    }
}