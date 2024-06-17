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
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authorization', 'memberEmail', 'greenEnergyType', 'kWh', 'name', 'region', 'type', 'city', 'from', 'to', 'country', 'isAvailable'], ['body']);
        
        var apiV1ResourceFindGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/resource/find').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['memberEmail', 'greenEnergyType', 'kWh', 'name', 'region', 'type', 'city', 'from', 'to', 'country', 'isAvailable']),
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
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authentication'], ['body']);
        
        var apiV1ScoresGpusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/gpus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authentication']),
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
        
        apiGateway.core.utils.assertParametersDefined(params, ['Authentication'], ['body']);
        
        var apiV1ScoresGpusNamesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/api/v1/scores/gpus/names').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Authentication']),
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
