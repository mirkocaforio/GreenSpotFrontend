//apiV1RewardsGet

import {AuthHeader, ApiClient} from "./AuthUtils";

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

export const createReward = (reward) => {
    let params = AuthHeader();
    const body = reward;
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsAddPost(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });

}

export const updateReward = (reward) => {
    let params = AuthHeader();
    const body = reward;
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsUpdatePatch(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const enableReward = (id) => {
    let params = AuthHeader();
    params["id"] = id;

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsEnableIdPatch(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const disableReward = (id) => {
    let params = AuthHeader();
    params["id"] = id;

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsDisableIdPatch(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export default {
    getRewards,
    getRewardById,
    createReward,
    updateReward,
    enableReward,
   disableReward
}