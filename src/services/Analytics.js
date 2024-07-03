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

export default {
    getUserTasksAnalytics,
    getOverallAnalytics,
    getOverallAnalyticsByDate
}