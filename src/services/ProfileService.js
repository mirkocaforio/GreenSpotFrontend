// ----- PROFILES MANAGEMENT ----- //

import {AuthHeader, ApiClient, CurrentUser, CurrentProfile} from "./AuthUtils";
import {ProfileModel} from "./Model/ProfileModel";

export const updateProfile = (name,surname,date,city,address,tel,fiscalCode,email) => {
    email = email ? email : CurrentUser().email;
    let role = CurrentProfile().role;
    const params = AuthHeader();
    const body = ProfileModel.setProfile(email,name,surname,date,city,address,tel,fiscalCode,role);
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersProfileUpdatePut(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
    });
}

export const getProfile = () => {

    let params = AuthHeader();
    params = {...params, userEmail: CurrentUser().email};

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersUserEmailGet(params, additionalParams)
        .then(function(result){
            localStorage.setItem('profile', JSON.stringify(result.data));
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
    });
}

export const getProfiles = (enabled,
                            email = "",
                            role = "",
                            name = "",
                            surname= "") => {
    let params = AuthHeader();
    params = {
        ...params,
        enabled: enabled,
        email: email,
        role: role,
        name: name,
        surname: surname,
    };

    const body = {};

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersGet(params,body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
    });
}

export const disableProfile = (email) => {
    let params = AuthHeader();
    params = {...params,
        profileEmail: email};

    const additionalParams = {};

    const body = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersProfileDisableProfileEmailPut(params, body,additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
    });
}

export default {
    updateProfile,
    getProfile,
    getProfiles,
    disableProfile
}