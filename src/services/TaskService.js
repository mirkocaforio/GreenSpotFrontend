import {AuthHeader, ApiClient, CurrentUser} from "./AuthUtils";

export const createTask = (data) => {
    let params = AuthHeader();

    const body = data;

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1TaskCreatePost(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getTasks = (data = null) => {
    let params = AuthHeader();

    if(data === null){
        data = { emailUtente: CurrentUser()?.email};
    }

    const body = data;
    const additionalParams = {};


    let apigClient = ApiClient();

    return apigClient.apiV1TaskFindPost(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const updateTask = (data) => {
    let params = AuthHeader();

    const body = data;

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1TaskUpdatePut(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const enableTask = (data) => {
    let params = AuthHeader();
    params["id"] = data?.id;

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1TaskEnableIdPut(params, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const disableTask = (data) => {
    let params = AuthHeader();
    params["id"] = data.id;

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1TaskDisableIdPut(params, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const stopTask = (data) => {
    let params = AuthHeader();
    params["id"] = data.id;

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1TaskStopIdPut(params, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export default {
    createTask,
    getTasks,
    updateTask,
    enableTask,
    disableTask,
    stopTask
};