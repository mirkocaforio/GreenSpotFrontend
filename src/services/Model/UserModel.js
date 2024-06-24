
// Contiene oggetto UserModel per gestire i dati dell'utente

export const UserModel = {
    user: {},

    setUser(email,token) {
        this.user.email = email;
        this.user.token = token;
        return this.user;
    },
    getUser() {
        return this.user;
    }

};
