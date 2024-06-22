//apiV1RewardsGet

import {AuthHeader, ApiClient, CurrentUser} from "./AuthUtils";

export const getRewards = () => {
    let params = AuthHeader();
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getRewardById = (id) => {
    let params = AuthHeader();
    params["id"] = id;

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsIdGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export default {
    getRewards,
    getRewardById
}