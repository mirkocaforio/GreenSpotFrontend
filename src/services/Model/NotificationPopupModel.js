class NotificationPopupModel {
    constructor(id, email, subject, message, sendAt, type, read) {
        this._id = id;
        this._email = email;
        this._subject = subject;
        this._message = message;
        this._sendAt = sendAt;
        this._type = type;
        this._read = read;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        let obj = json;
        return new NotificationPopupModel(obj._id, obj._email, obj._subject, obj._message, obj._sendAt, obj._type, obj._read);
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get subject() {
        return this._subject;
    }

    set subject(value) {
        this._subject = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get sendAt() {
        return this._sendAt;
    }

    set sendAt(value) {
        this._sendAt = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get read() {
        return this._read;
    }

    set read(value) {
        this._read = value;
    }
}