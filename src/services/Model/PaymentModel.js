class PaymentModel {
    constructor() {
        this.payment = {
            invoiceNumber: "",
            invoiceDescription: "",
            userName: "",
            userSurname: "",
            userEmail: "",
            userResidenceCity: "",
            userResidenceAddress: "",
            invoicePaymentMethod: "",
            invoicePaymentDate: "",
            invoiceItems: [
                {
                    senderEmail: "",
                    description: "",
                    amount: 0.0
                }
            ],
            invoicePartialAmount: 0.0,
            invoiceDelayAmount: 0.0,
            invoiceTotalAmount: 0.0,
            invoiceStatus: "",
            invoiceOverdueDate: ""
        };
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        let obj = json;
        return new PaymentModel(obj.invoiceNumber, obj.invoiceDescription, obj.userName, obj.userSurname, obj.userEmail, obj.userResidenceCity, obj.userResidenceAddress, obj.invoicePaymentMethod, obj.invoicePaymentDate, obj.invoiceItems, obj.invoicePartialAmount, obj.invoiceDelayAmount, obj.invoiceTotalAmount, obj.invoiceStatus, obj.invoiceOverdueDate);
    }
}

export default PaymentModel;