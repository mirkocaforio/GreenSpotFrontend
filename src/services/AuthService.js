// ---- AUTHENTICATION SERVICE LOGIC ---- //



import {ApiClient} from "./AuthUtils";
import {UserModel} from "./UserModel";
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

const logout = () => {
    localStorage.removeItem('user');
}


export default {
    login,
    logout,
    register
};