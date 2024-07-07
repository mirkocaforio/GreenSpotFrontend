import {AuthHeader, ApiClient} from "./AuthUtils";

export const getUserTasksAnalytics = () => {
    let params = AuthHeader();
    const additionalParams = {};
    const body = { };

    let apigClient = ApiClient();

    return apigClient.apiV1AnalyticsUserTasksGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getOverallAnalytics = () => {
    let params = AuthHeader();
    const additionalParams = {};
    const body = { };

    let apigClient = ApiClient();

    return apigClient.apiV1AnalyticsOverallGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getOverallAnalyticsByDate = (startDate, endDate) => {
    let params = AuthHeader();
    params = {
        ...params,
        startDate: startDate,
        endDate: endDate
    }
    const additionalParams = {};
    const body = {  };

    let apigClient = ApiClient();

    return apigClient.apiV1AnalyticsOverallFilterGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });

}

export const getTransactionUserAnalytics = (month, year, granularity) => {
    let params = AuthHeader();
    params = {
        ...params,
        month: month,
        year: year,
        granularity: granularity
    }
    const additionalParams = {};
    const body = {  };

    let apigClient = ApiClient();

    return apigClient.apiV1TransactionsAnalyticsUserGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getTransactionMemberAnalytics = (month, year, granularity) => {
    let params = AuthHeader();
    params = {
        ...params,
        month: month,
        year: year,
        granularity: granularity
    }
    const additionalParams = {};
    const body = {  };

    let apigClient = ApiClient();

    return apigClient.apiV1TransactionsAnalyticsMemberGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getPaymentUserAnalytics = (month, year, granularity) => {
    let params = AuthHeader();
    params = {
        ...params,
        month: month,
        year: year,
        granularity: granularity
    }
    const additionalParams = {};
    const body = {  };

    let apigClient = ApiClient();

    return apigClient.apiV1PaymentAnalyticsUserGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getPaymentAdminAnalytics = (month, year, granularity) => {
    let params = AuthHeader();
    params = {
        ...params,
        month: month,
        year: year,
        granularity: granularity
    }
    const additionalParams = {};
    const body = {  };

    let apigClient = ApiClient();

    return apigClient.apiV1PaymentAnalyticsAdminGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export default {
    getUserTasksAnalytics,
    getOverallAnalytics,
    getOverallAnalyticsByDate,
    getTransactionUserAnalytics,
    getTransactionMemberAnalytics,
    getPaymentUserAnalytics,
    getPaymentAdminAnalytics
}