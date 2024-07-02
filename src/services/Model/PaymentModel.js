class PaymentModel {
    constructor() {
        this.payment = {
            invoiceNumber: "",
            invoiceDescription: "",
            userEmail: "",
            invoicePaymentMethod: "",
            invoicePaymentDate: "",
            invoiceItems: [
                {
                    senderEmail: "",
                    description: "",
                    amount: 0.0
                }
            ],
            invoiceAmount: 0.0,
            invoiceStatus: "",
            invoiceOverdueDate: ""
        };
    }

    toJson() {
        return JSON.stringify(this);
    }

    static fromJson(json) {
        let obj = json;
        return new PaymentModel(obj.invoiceNumber, obj.invoiceDescription, obj.userEmail, obj.invoicePaymentMethod, obj.invoicePaymentDate, obj.invoiceItems, obj.invoiceAmount, obj.invoiceStatus, obj.invoiceOverdueDate);
    }
}

export default PaymentModel;