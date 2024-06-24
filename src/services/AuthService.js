// ---- AUTHENTICATION SERVICE LOGIC ---- //



import {ApiClient, AuthHeader} from "./AuthUtils";
import {UserModel} from "./Model/UserModel";
import localStorage from "redux-persist/es/storage";
import {updateProfile} from "./ProfileService";

const login = (email, password, persist) => {
    const params = {};
    const body = {
        email: email,
        password: password,
    };
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersSigninPost(params, body, additionalParams)
        .then(function(result){
            const jwt = result.data.jwt;

            let user = UserModel;
            user.setUser(email, jwt);

            if (persist) {
                localStorage.setItem('user', JSON.stringify(user.getUser()));
            }
            //TODO: Prima di ritornare deve caricare le info del utente
            //return Promise.resolve(result.data);
            return Promise.resolve(user.getUser());
        }).catch( function(result){
            return Promise.reject(result);
    });

}

const register = (name,surname,date,city,address,tel,email, password) => {
    const params = {};
    const body = {
        email: email,
        password: password,
        name: name,
        surname: surname
    };
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersSignupPost(params, body, additionalParams)
        .then(function(){
            // Schedule login and updateProfile to run asynchronously
            setTimeout(() => {
                //First login and then update profile
                return login(email, password, true).then( function(){
                    updateProfile(name, surname, date, city, address, tel, email);
                }).catch( function(result){
                    console.error("Error: " + result);
                });
            }, 0);

            return Promise.resolve("Registered successfully!");
        }).catch( function(result){
            return Promise.reject(result);
        });


}

const requestRecovery = (email) => {
    const params = {email: email};
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersRecoverGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}


const resetPassword = (recoverId, password) => {
    const params = {requestId: recoverId};
    const body = {newPassword: password};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersRecoverRequestIdPost(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });

}

const changePassword = (oldPassword, newPassword) => {
    const params = AuthHeader();
    const body = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersChangePasswordPost(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });

}

const logout = () => {
    localStorage.removeItem('user');
}


export default {
    login,
    logout,
    register,
    requestRecovery,
    resetPassword,
    changePassword
};