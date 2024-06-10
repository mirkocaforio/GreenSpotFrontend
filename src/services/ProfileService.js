// ----- PROFILES MANAGEMENT ----- //

import  {AuthHeader,ApiClient} from "./AuthUtils";
import {ProfileModel} from "./ProfileModel";
import {ROLE_MEMBER} from "./AuthConstants";

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

    const params = AuthHeader();
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersProfileGet(params, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
    });
}