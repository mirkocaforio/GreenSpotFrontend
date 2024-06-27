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
    },
    setProfileAll(profile) {
        this.profile = profile;
    },
    setProfile(email,name, surname, date, city, address, tel,fiscalCode, role, registrationDate) {
        this.profile.email = email ? email : this.profile.email;
        this.profile.name = name ? name : this.profile.name;
        this.profile.surname = surname ? surname : this.profile.surname;
        this.profile.birthDate = date ? date : this.profile.birthDate;
        this.profile.residenceCity = city ? city : this.profile.residenceCity;
        this.profile.residenceAddress = address ? address : this.profile.residenceAddress;
        this.profile.phoneNumber = tel ? tel : this.profile.phoneNumber;
        this.profile.fiscalCode = fiscalCode ? fiscalCode : this.profile.fiscalCode;
        this.profile.role = role ? role : this.profile.role;
        this.profile.registrationDate = registrationDate ? registrationDate : this.profile.registrationDate;
        return this.profile;
    },
    getProfile() {
        return this.profile;
    }
}