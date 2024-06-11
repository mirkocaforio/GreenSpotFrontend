// ----- PROFILES MANAGEMENT ----- //

import {AuthHeader, ApiClient, CurrentUser} from "./AuthUtils";
import {ProfileModel} from "./ProfileModel";
import {ROLE_MEMBER} from "../config";

export const updateProfile = (name,surname,date,city,address,tel,email) => {
    const params = AuthHeader();
    const body = ProfileModel.setProfile(email,name,surname,date,city,address,tel, ROLE_MEMBER);
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

export default {
    updateProfile,
    getProfile
}