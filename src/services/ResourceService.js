import {AuthHeader, ApiClient, CurrentUser} from "./AuthUtils";

export const getAllResources = () => {
    const params = AuthHeader();
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ResourceFindAllGet(params, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const getResourceByEmail = () => {
    let params = AuthHeader();

    params = {
        ...params,
        memberEmail: CurrentUser()?.email,
        name: "",
        type: "",
        brand: "",
        model: "",
        greenEnergyType: "",
        country: "",
        region: "",
        city: "",
        availability: "",
        kWh: "",
        status: "",
        from: "",
        to: ""
    };

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ResourceFindGet(params, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const insertResource = (name, type, greenEnergyType, country, region, city, availability, kwh, memberEmail) => {
    const params = AuthHeader();
    const body = {
        name: name,
        type: type,
        greenEnergyType: greenEnergyType,
        country: country,
        region: region,
        city: city,
        availability: availability,
        kwh: kwh,
        memberEmail: memberEmail,
        status: "UNAVAILABLE"
    };

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ResourceInsertPost(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });

}

export const updateResource = (id, name, type, greenEnergyType, country, region, city, availability, kwh, memberEmail) => {
    const params = AuthHeader();
    const body = {
        id: id,
        name: name,
        type: type,
        greenEnergyType: greenEnergyType,
        country: country,
        region: region,
        city: city,
        availability: availability,
        kwh: kwh,
        memberEmail: memberEmail
    };
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ResourceUpdatePut(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const makeResourceAvailable = (id) => {
    let params = AuthHeader();
    params = {
        ...params,
        idResource: id
    };
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ResourceAvailableIdResourcePut(params, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const makeResourceUnavailable = (id) => {
    let params = AuthHeader();
    params = {
        ...params,
        idResource: id
    };
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1ResourceUnavailableIdResourcePut(params, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export default {
    getAllResources,
    getResourceByEmail,
    insertResource,
    updateResource,
    makeResourceAvailable,
    makeResourceUnavailable
}