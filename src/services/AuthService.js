// ---- AUTHENTICATION SERVICE LOGIC ---- //


let apigClient = null;
let isLogged = false;

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
            isLogged = true;
            return result.data;
        }).catch( function(result){
            console.log(JSON.stringify(result, '', 2));
            return result;
    });

}

const logout = () => {
    localStorage.removeItem('token');
    isLogged = false;
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('token'));
}

export default {
    login,
    logout,
    getCurrentUser,
    isLogged
};