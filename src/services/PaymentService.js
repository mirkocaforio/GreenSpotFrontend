import {ApiClient, AuthHeader, CurrentUser} from "./AuthUtils";

export const getAllInvoices = () => {
    const params = AuthHeader();
    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1InvoiceFindAllGet(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const getInvoicesByUserEmail = () => {
    let params = AuthHeader();

    params = {
        ...params,
        userEmail: CurrentUser()?.email,
        invoicePaymentMethod: "",
        invoicePaymentDate: "",
        invoiceAmount: "",
        invoiceStatus: "",
        invoiceOverdueDate: ""
    }

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1InvoiceFindGet(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export const payInvoice = (invoiceNumber) => {
    let params = AuthHeader();

    params = {
        ...params,
        invoiceNumber: invoiceNumber
    }

    const body = {};
    const additionalParams = {};

    let apigClient = ApiClient();

    return apigClient.apiV1PaymentPayInvoiceNumberPut(params, body, additionalParams)
        .then(function (result) {
            return Promise.resolve(result.data);
        }).catch(function (result) {
            return Promise.reject(result);
        });
}

export default {
    getAllInvoices,
    getInvoicesByUserEmail,
    payInvoice
}