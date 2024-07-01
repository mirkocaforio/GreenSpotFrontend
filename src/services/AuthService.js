// ---- AUTHENTICATION SERVICE LOGIC ---- //



import {ApiClient, AuthHeader, getRole} from "./AuthUtils";
import {UserModel} from "./Model/UserModel";
import localStorage from "redux-persist/es/storage";
import {getProfile, updateProfile} from "./ProfileService";

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

            localStorage.setItem('user', JSON.stringify(user.getUser()));

            //Dopo 10 minuti si resetta il token
            if (!persist) {
                setTimeout(() => {
                    localStorage.removeItem('user');
                }, 600000);
            }

            return getProfile().then( function(){
                return Promise.resolve(user.getUser());
            }).catch( function(result){
                return Promise.reject(result);
            })
        }).catch( function(result){
            return Promise.reject(result);
    });

}

const register = (data, isJoining) => {
    const params = {};
    const body = {
        email: data?.email,
        password: data?.password,
        name: data?.name,
        surname: data?.surname,
        role: getRole(isJoining),
    };
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1UsersSignupPost(params, body, additionalParams)
        .then(function(){
            // Schedule login and updateProfile to run asynchronously
            setTimeout(() => {
                //First login and then update profile
                return login(data?.email, data?.password, true).then( function(){
                    return updateProfile(data).then(
                        function(){
                        }).catch( function(result){
                            console.error("Error: " + result);
                        }
                    );
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