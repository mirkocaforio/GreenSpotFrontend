import {AuthHeader, ApiClient, CurrentUser} from "./AuthUtils";

export const getTransactions = ({id}) => {
    let params = AuthHeader();
    params = {...params, email: CurrentUser().email, id: id ? id : "noid"};

    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1TransactionsFindGet(params, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
    });
}


export default {
    getTransactions
}