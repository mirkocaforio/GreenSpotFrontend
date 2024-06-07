
export default function AuthHeader(){
    const token = localStorage.getItem('token');

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}