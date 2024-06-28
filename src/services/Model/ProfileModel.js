export const ProfileModel = {
    profile: {
        email: "",
        name: "",
        surname: "",
        birthDate: "",
        residenceCity: "",
        residenceAddress: "",
        phoneNumber: "",
        fiscalCode: "",
        role: "",
        registrationDate: "",
        cardNumber: "",
        cardExpiryDate: "",
        cardCvv: "",
    },
    setProfileAll(profile) {
        this.profile = profile;
    },
    setProfile(email,name, surname, date, city, address, tel,fiscalCode, role, registrationDate, cardNumber, cardExpiryDate, cardCvv) {
        this.profile.email = email || this.profile.email;
        this.profile.name = name || this.profile.name;
        this.profile.surname = surname || this.profile.surname;
        this.profile.birthDate = date || this.profile.birthDate;
        this.profile.residenceCity = city || this.profile.residenceCity;
        this.profile.residenceAddress = address || this.profile.residenceAddress;
        this.profile.phoneNumber = tel || this.profile.phoneNumber;
        this.profile.fiscalCode = fiscalCode || this.profile.fiscalCode;
        this.profile.role = role || this.profile.role;
        this.profile.registrationDate = registrationDate || this.profile.registrationDate;
        this.profile.cardNumber = cardNumber || this.profile.cardNumber;
        this.profile.cardExpiryDate = cardExpiryDate || this.profile.cardExpiryDate;
        this.profile.cardCvv = cardCvv || this.profile.cardCvv;
        return this.profile;
    },
    getProfile() {
        return this.profile;
    }
}