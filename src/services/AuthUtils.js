

export function ApiClient() {

    if(window.apigClientFactory) {
        return window.apigClientFactory.newClient();
    } else {
        console.error('apigClientFactory non è definito');
        return null;
    }

}

export function isTokenExpired(message) {
    return (message && message.startsWith('Invalid token: JWT expired'));
}

export function AuthHeader(){
    const token = JSON.parse(localStorage.getItem('user'));

    if (token) {
        return { Authorization: 'Bearer ' + token.token };
    } else {
        return {};
    }
}