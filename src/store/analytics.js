import {
    GET_ANALYTICS_FAIL,
    GET_ANALYTICS_SUCCESS, GET_MEMBER_ANALYTICS_FAIL, GET_MEMBER_ANALYTICS_SUCCESS, GET_OVERALL_ANALYTICS_FAIL,
    GET_OVERALL_ANALYTICS_SUCCESS, GET_PAYMENT_ADMIN_ANALYTICS_FAIL,
    GET_PAYMENT_ADMIN_ANALYTICS_SUCCESS, GET_PAYMENT_USER_ANALYTICS_FAIL,
    GET_PAYMENT_USER_ANALYTICS_SUCCESS, GET_TRANSACTION_MEMBER_ANALYTICS_FAIL,
    GET_TRANSACTION_MEMBER_ANALYTICS_SUCCESS, GET_TRANSACTION_USER_ANALYTICS_FAIL,
    GET_TRANSACTION_USER_ANALYTICS_SUCCESS, GET_USER_ANALYTICS_FAIL, GET_USER_ANALYTICS_SUCCESS,
    LOGOUT
} from "../actions/types";


const initialState = {
    userAnalytics: null,
    tasksAnalytics: null,
    memberAnalytics: null,
    overallAnalytics: null,
    transactionUserAnalytics: null,
    transactionMemberAnalytics: null,
    paymentUserAnalytics: null,
    paymentAdminAnalytics: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_USER_ANALYTICS_SUCCESS:
            return {
                ...state,
                userAnalytics: payload.userAnalytics,
            };
        case GET_USER_ANALYTICS_FAIL:
            return {
                ...state,
                userAnalytics: state.userAnalytics ? state.userAnalytics : null
            };
        case GET_ANALYTICS_SUCCESS:
            return {
                ...state,
                tasksAnalytics: payload.tasksAnalytics,
            };
        case GET_ANALYTICS_FAIL:
            return {
                ...state,
                tasksAnalytics: state.tasksAnalytics ? state.tasksAnalytics : null
            };
            case GET_MEMBER_ANALYTICS_SUCCESS:
            return {
                ...state,
                memberAnalytics: payload.memberAnalytics,
            };
        case GET_MEMBER_ANALYTICS_FAIL:
            return {
                ...state,
                memberAnalytics: state.memberAnalytics ? state.memberAnalytics : null
            };
        case GET_OVERALL_ANALYTICS_SUCCESS:
            return {
                ...state,
                overallAnalytics: {
                    ...state.overallAnalytics,
                    ...payload.overallAnalytics
                },
            };
        case GET_OVERALL_ANALYTICS_FAIL:
            return {
                ...state,
                overallAnalytics: state.overallAnalytics ? state.overallAnalytics : null
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
                userAnalytics: null,
                tasksAnalytics: null,
                memberAnalytics: null,
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