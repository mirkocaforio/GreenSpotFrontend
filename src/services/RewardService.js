//apiV1RewardsGet

import {AuthHeader, ApiClient, CurrentUser} from "./AuthUtils";
import BuyRewardModel from "./Model/BuyRewardModel";

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

export const buyReward = (data) => {
    let params = AuthHeader();

    let dataObj = BuyRewardModel.fromJson(data);
    dataObj.userEmail = CurrentUser()?.email;

    const body = dataObj.toJson();


    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsRedeemPost(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}


export const getRedeems = () => {
    let params = AuthHeader();
    params["email"] = CurrentUser()?.email;
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsRedeemUserEmailGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const useRedeem = (redeemCode) => {
    let params = AuthHeader();
    params["redeemCode"] = redeemCode;

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1RewardsRedeemUseRedeemCodePatch(params, body, additionalParams)
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
   disableReward,
    buyReward,
    getRedeems,
    useRedeem,
}