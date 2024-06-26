import {AuthHeader, ApiClient, CurrentUser} from "./AuthUtils";

export const getAllEmailNotifications = () => {
    let params = AuthHeader();
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1NotificationEmailFindAllGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getAllPopupNotifications = () => {
    let params = AuthHeader();
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1NotificationPopupFindAllGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getEmailNotificationByEmail = () => {
    let params = AuthHeader();

    params = {
        ...params,
        email: CurrentUser()?.email,
        subject: "",
        from: "",
        to: "",
    };

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1NotificationEmailFindGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const getPopupNotificationByEmail = () => {
    let params = AuthHeader();

    params = {
        ...params,
        email: CurrentUser()?.email,
        subject: "",
        from: "",
        to: "",
        read: ""
    };

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1NotificationPopupFindGet(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const readPopupNotification = (id, read) => {
    let params = AuthHeader();

    params = {
        ...params,
        notificationId: id,
        readStatus: read
    };

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1NotificationUpdateReadNotificationIdReadStatusPut(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export const readAllPopupNotification = (read) => {
    let params = AuthHeader();

    params = {
        ...params,
        readStatus: read
    };

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1NotificationUpdateReadAllReadStatusPut(params, body, additionalParams)
        .then(function(result){
            return Promise.resolve(result.data);
        }).catch( function(result){
            return Promise.reject(result);
        });
}

export default {
    getAllEmailNotifications,
    getAllPopupNotifications,
    getEmailNotificationByEmail,
    getPopupNotificationByEmail,
    readPopupNotification,
    readAllPopupNotification
}