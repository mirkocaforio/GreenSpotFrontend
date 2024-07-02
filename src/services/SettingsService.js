import {ApiClient, AuthHeader} from "./AuthUtils";


export const getAssignmentSettings = () => {
    const params = AuthHeader();
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1SettingsAssignmentGetGet(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const getPaymentSettings = () => {
    const params = AuthHeader();
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1SettingsPaymentGetGet(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });

}

export const setAssignmentSettings = (data) => {
    const params = AuthHeader();
    const body = data;
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1SettingsAssignmentSetPut(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const updatePaymentSettings = (data) => {
    const params = AuthHeader();
    const body = data;
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1SettingsPaymentUpdatePut(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export default {
    getAssignmentSettings,
    getPaymentSettings,
    setAssignmentSettings,
    updatePaymentSettings
}