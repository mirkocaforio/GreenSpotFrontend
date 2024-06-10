export const ProfileModel = {
    profile: {},
    setProfile(email,name, surname, date, city, address, tel, role) {
        this.profile.email = email;
        this.profile.name = name;
        this.profile.surname = surname;
        this.profile.birthDate = date;
        this.profile.residenceCity = city;
        this.profile.residenceAddress = address;
        this.profile.fiscalCode = tel;
        this.profile.role = role;
        return this.profile;
    },
    getProfile() {
        return this.profile;
    }
}