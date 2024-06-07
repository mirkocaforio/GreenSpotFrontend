
export default function AuthHeader(){
    const user = JSON.parse(localStorage.getItem('token'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user };
    } else {
        return {};
    }
}