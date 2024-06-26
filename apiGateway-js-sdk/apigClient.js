/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://ypb8iqx3la.execute-api.us-east-1.amazonaws.com/deploy';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.apiOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1Options = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1OptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1OptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1AnalyticsUserGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1AnalyticsUserGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/analytics/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1AnalyticsUserGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1AnalyticsUserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1AnalyticsUserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/analytics/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1AnalyticsUserOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1AnalyticsUserFilterGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'startDate', 'taskId', 'endDate'], ['body']);
        
        var apiV1AnalyticsUserFilterGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/analytics/user/filter').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['startDate', 'taskId', 'endDate']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1AnalyticsUserFilterGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1AnalyticsUserFilterOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1AnalyticsUserFilterOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/analytics/user/filter').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1AnalyticsUserFilterOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1AnalyticsUserTasksGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1AnalyticsUserTasksGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/analytics/user/tasks').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1AnalyticsUserTasksGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1AnalyticsUserTasksOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1AnalyticsUserTasksOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/analytics/user/tasks').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1AnalyticsUserTasksOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationEmailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationEmailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/email').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationEmailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationEmailFindGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'email', 'from', 'subject', 'to'], ['body']);
        
        var apiV1NotificationEmailFindGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/email/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['email', 'from', 'subject', 'to']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationEmailFindGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationEmailFindOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationEmailFindOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/email/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationEmailFindOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationEmailFindAllGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1NotificationEmailFindAllGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/email/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationEmailFindAllGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationEmailFindAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationEmailFindAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/email/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationEmailFindAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationPopupOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationPopupOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/popup').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationPopupOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationPopupFindGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'email', 'read', 'from', 'subject', 'to'], ['body']);
        
        var apiV1NotificationPopupFindGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/popup/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['email', 'read', 'from', 'subject', 'to']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationPopupFindGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationPopupFindOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationPopupFindOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/popup/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationPopupFindOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationPopupFindAllGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1NotificationPopupFindAllGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/popup/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationPopupFindAllGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationPopupFindAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationPopupFindAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/popup/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationPopupFindAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationUpdateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateReadOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationUpdateReadOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update/read').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateReadOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateReadAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationUpdateReadAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update/read/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateReadAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateReadAllReadStatusPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['readStatus', 'Authorization'], ['body']);
        
        var apiV1NotificationUpdateReadAllReadStatusPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update/read/all/{readStatus}').expand(apiGateway.core.utils.parseParametersToObject(params, ['readStatus', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateReadAllReadStatusPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateReadAllReadStatusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationUpdateReadAllReadStatusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update/read/all/{readStatus}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateReadAllReadStatusOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateReadNotificationIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationUpdateReadNotificationIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update/read/{notificationId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateReadNotificationIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateReadNotificationIdReadStatusPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['notificationId', 'readStatus', 'Authorization'], ['body']);
        
        var apiV1NotificationUpdateReadNotificationIdReadStatusPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update/read/{notificationId}/{readStatus}').expand(apiGateway.core.utils.parseParametersToObject(params, ['notificationId', 'readStatus', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateReadNotificationIdReadStatusPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1NotificationUpdateReadNotificationIdReadStatusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1NotificationUpdateReadNotificationIdReadStatusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/notification/update/read/{notificationId}/{readStatus}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1NotificationUpdateReadNotificationIdReadStatusOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceAssignmentGetGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1ResourceAssignmentGetGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/assignment/get').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceAssignmentGetGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceAssignmentGetOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceAssignmentGetOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/assignment/get').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceAssignmentGetOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceAssignmentStartPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1ResourceAssignmentStartPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/assignment/start').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceAssignmentStartPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceAssignmentStartOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceAssignmentStartOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/assignment/start').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceAssignmentStartOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceAvailableOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceAvailableOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/available').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceAvailableOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceAvailableIdResourcePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idResource', 'Authorization'], ['body']);
        
        var apiV1ResourceAvailableIdResourcePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/available/{idResource}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idResource', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceAvailableIdResourcePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceAvailableIdResourceOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceAvailableIdResourceOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/available/{idResource}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceAvailableIdResourceOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceFindGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'memberEmail', 'greenEnergyType', 'kWh', 'name', 'region', 'type', 'city', 'status', 'from', 'to', 'country'], ['body']);
        
        var apiV1ResourceFindGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['memberEmail', 'greenEnergyType', 'kWh', 'name', 'region', 'type', 'city', 'status', 'from', 'to', 'country']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceFindGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceFindOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceFindOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceFindOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceFindAllGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ResourceFindAllGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceFindAllGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceFindAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceFindAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceFindAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceInsertPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1ResourceInsertPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/insert').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceInsertPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceInsertOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceInsertOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/insert').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceInsertOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceUnavailableOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceUnavailableOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/unavailable').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceUnavailableOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceUnavailableIdResourcePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idResource', 'Authorization'], ['body']);
        
        var apiV1ResourceUnavailableIdResourcePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/unavailable/{idResource}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idResource', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceUnavailableIdResourcePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceUnavailableIdResourceOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceUnavailableIdResourceOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/unavailable/{idResource}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceUnavailableIdResourceOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceUpdatePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1ResourceUpdatePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceUpdatePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ResourceUpdateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ResourceUpdateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ResourceUpdateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1RewardsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsAddPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1RewardsAddPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/add').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsAddPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsAddOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsAddOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/add').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsAddOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsDisableIdPatch = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'Authorization'], ['body']);
        
        var apiV1RewardsDisableIdPatchRequest = {
            verb: 'patch'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/disable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsDisableIdPatchRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsDisableIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsDisableIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/disable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsDisableIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsEnableIdPatch = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1RewardsEnableIdPatchRequest = {
            verb: 'patch'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/enable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsEnableIdPatchRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsEnableIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsEnableIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/enable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsEnableIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsRedeemPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1RewardsRedeemPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/redeem').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsRedeemPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsRedeemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsRedeemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/redeem').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsRedeemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsRedeemUseRedeemCodePatch = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['redeemCode', 'Authorization'], ['body']);
        
        var apiV1RewardsRedeemUseRedeemCodePatchRequest = {
            verb: 'patch'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/redeem/use/{redeemCode}').expand(apiGateway.core.utils.parseParametersToObject(params, ['redeemCode', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsRedeemUseRedeemCodePatchRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsRedeemUseRedeemCodeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsRedeemUseRedeemCodeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/redeem/use/{redeemCode}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsRedeemUseRedeemCodeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsRedeemUserEmailGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['email', 'Authorization'], ['body']);
        
        var apiV1RewardsRedeemUserEmailGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/redeem/user/{email}').expand(apiGateway.core.utils.parseParametersToObject(params, ['email', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsRedeemUserEmailGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsRedeemUserEmailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsRedeemUserEmailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/redeem/user/{email}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsRedeemUserEmailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsUpdatePatch = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1RewardsUpdatePatchRequest = {
            verb: 'patch'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsUpdatePatchRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsUpdateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsUpdateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsUpdateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1RewardsIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1RewardsIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1RewardsIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/rewards/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1RewardsIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ScoresOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresCpusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ScoresCpusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/cpus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresCpusGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresCpusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ScoresCpusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/cpus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresCpusOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresCpusNamesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ScoresCpusNamesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/cpus/names').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresCpusNamesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresCpusNamesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ScoresCpusNamesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/cpus/names').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresCpusNamesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresGpusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ScoresGpusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/gpus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresGpusGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresGpusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ScoresGpusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/gpus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresGpusOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresGpusNamesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1ScoresGpusNamesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/gpus/names').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresGpusNamesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1ScoresGpusNamesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1ScoresGpusNamesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/gpus/names').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1ScoresGpusNamesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1SettingsAssignmentGetGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1SettingsAssignmentGetGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/settings/assignment/get').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1SettingsAssignmentGetGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1SettingsAssignmentGetOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1SettingsAssignmentGetOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/settings/assignment/get').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1SettingsAssignmentGetOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1SettingsAssignmentSetPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1SettingsAssignmentSetPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/settings/assignment/set').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1SettingsAssignmentSetPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1SettingsAssignmentSetOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1SettingsAssignmentSetOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/settings/assignment/set').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1SettingsAssignmentSetOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1TaskCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TaskCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskDisableIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1TaskDisableIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/disable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskDisableIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskDisableIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TaskDisableIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/disable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskDisableIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskEnableIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1TaskEnableIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/enable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskEnableIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskEnableIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TaskEnableIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/enable/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskEnableIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskFindPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1TaskFindPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskFindPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskFindOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TaskFindOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskFindOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskRunIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1TaskRunIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/run/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskRunIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskRunIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TaskRunIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/run/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskRunIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskStopIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1TaskStopIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/stop/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskStopIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskStopIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TaskStopIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/stop/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskStopIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskUpdatePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1TaskUpdatePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskUpdatePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TaskUpdateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TaskUpdateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/task/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TaskUpdateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsCreatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1TransactionsCreatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsCreatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsCreateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TransactionsCreateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/create').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsCreateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'email', 'Authorization'], ['body']);
        
        var apiV1TransactionsFindGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['id', 'email', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TransactionsFindOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindStatusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['completed', 'Authorization'], ['body']);
        
        var apiV1TransactionsFindStatusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/find/status').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['completed', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindStatusGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindStatusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TransactionsFindStatusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/find/status').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindStatusOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'id'], ['body']);
        
        var apiV1TransactionsFindIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/find/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TransactionsFindIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/find/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindallGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1TransactionsFindallGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/findall').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindallGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1TransactionsFindallOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1TransactionsFindallOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/transactions/findall').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1TransactionsFindallOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'email', 'enabled', 'surname', 'role', 'name'], ['body']);
        
        var apiV1UsersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['email', 'enabled', 'surname', 'role', 'name']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersChangeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersChangeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/change').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersChangeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersChangePasswordPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1UsersChangePasswordPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/change/password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersChangePasswordPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersChangePasswordOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersChangePasswordOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/change/password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersChangePasswordOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileDisableOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersProfileDisableOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/disable').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileDisableOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileDisableProfileEmailPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['profileEmail', 'Authorization'], ['body']);
        
        var apiV1UsersProfileDisableProfileEmailPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/disable/{profileEmail}').expand(apiGateway.core.utils.parseParametersToObject(params, ['profileEmail', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileDisableProfileEmailPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileDisableProfileEmailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersProfileDisableProfileEmailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/disable/{profileEmail}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileDisableProfileEmailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileEnableOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersProfileEnableOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/enable').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileEnableOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileEnableProfileEmailPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['profileEmail', 'Authorization'], ['body']);
        
        var apiV1UsersProfileEnableProfileEmailPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/enable/{profileEmail}').expand(apiGateway.core.utils.parseParametersToObject(params, ['profileEmail', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileEnableProfileEmailPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileEnableProfileEmailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersProfileEnableProfileEmailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/enable/{profileEmail}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileEnableProfileEmailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileFindGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'role', 'isEnabled', 'phoneNumber', 'email', 'name', 'residenceCity', 'residenceAddress', 'birthDate', 'surname', 'fiscalCode', 'registrationDate'], ['body']);
        
        var apiV1UsersProfileFindGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['role', 'isEnabled', 'phoneNumber', 'email', 'name', 'residenceCity', 'residenceAddress', 'birthDate', 'surname', 'fiscalCode', 'registrationDate']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileFindGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileFindOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersProfileFindOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileFindOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileFindAllGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization'], ['body']);
        
        var apiV1UsersProfileFindAllGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileFindAllGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileFindAllOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersProfileFindAllOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/find/all').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileFindAllOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileUpdatePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'body'], ['body']);
        
        var apiV1UsersProfileUpdatePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileUpdatePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersProfileUpdateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersProfileUpdateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/profile/update').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersProfileUpdateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersRecoverGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['email'], ['body']);
        
        var apiV1UsersRecoverGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/recover').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['email']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersRecoverGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersRecoverOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersRecoverOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/recover').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersRecoverOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersRecoverRequestIdPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['requestId', 'body'], ['body']);
        
        var apiV1UsersRecoverRequestIdPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/recover/{requestId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['requestId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersRecoverRequestIdPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersRecoverRequestIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersRecoverRequestIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/recover/{requestId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersRecoverRequestIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersSigninPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var apiV1UsersSigninPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/signin').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersSigninPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersSigninOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersSigninOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/signin').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersSigninOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersSignupPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var apiV1UsersSignupPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/signup').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersSignupPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersSignupOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersSignupOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/signup').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersSignupOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUserEmailGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userEmail', 'Authorization'], ['body']);
        
        var apiV1UsersUserEmailGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/{userEmail}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userEmail', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUserEmailGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1UsersUserEmailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1UsersUserEmailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/users/{userEmail}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1UsersUserEmailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1WalletFindGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'email'], ['body']);
        
        var apiV1WalletFindGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/wallet/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['email']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1WalletFindGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiV1WalletFindOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiV1WalletFindOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/wallet/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiV1WalletFindOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
