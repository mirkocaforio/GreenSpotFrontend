// ---- AUTHENTICATION SERVICE LOGIC ---- //


let apigClient = null;

if(window.apigClientFactory) {
    apigClient = window.apigClientFactory.newClient();
} else {
    console.error('apigClientFactory non è definito');
}

const login = (email, password, persist) => {
    var params = {};
    var body = {
        email: email,
        password: password,
    };
    var additionalParams = {
    };

    return apigClient.apiV1UsersSigninPost(params, body, additionalParams)
        .then(function(result){
            const jwt = result.data.jwt;
            if (persist) {
                localStorage.setItem('token', jwt);
            }
            return Promise.resolve(result.data);
        }).catch( function(result){

            if(result.response && result.response.data) {
                console.error(result.response.data);
                return Promise.reject(result.response.data);
            } else if (result.request) {
                console.error(result.request);
                return Promise.reject(result.request);
            }else if (result.data) {
                console.error(result.data.message);
                return Promise.reject(result.data.message);
            } else{
                console.error(JSON.stringify(result));
                return Promise.reject(result);
            }


    });

}

const logout = () => {
    localStorage.removeItem('token');
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('token'));
}

export default {
    login,
    logout,
    getCurrentUser
};