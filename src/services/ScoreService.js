import {AuthHeader, ApiClient} from "./AuthUtils";

export const getCpuNames = () => {
    const params = AuthHeader();
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ScoresCpusNamesGet(params, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const getGpuNames = () => {
    const params = AuthHeader();
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ScoresGpusNamesGet(params, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export default {
    getCpuNames,
    getGpuNames
}