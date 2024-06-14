
import {ApiClient, AuthHeader, CurrentUser} from "./AuthUtils";

export const getWallet = () => {
    let params = AuthHeader();
    params = {...params, email: CurrentUser().email};
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1WalletFindGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export default {
    getWallet
}