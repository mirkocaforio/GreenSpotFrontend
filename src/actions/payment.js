import {
    GET_INVOICES_SUCCESS,
    GET_INVOICES_FAIL,
    SET_MESSAGE
} from "./types";

import PaymentService from "../services/PaymentService";
import {MSG_SUCCESS} from "../config";
import {onError} from "./expiration";

export const getAllInvoices = () => (dispatch) => {
    return PaymentService.getAllInvoices().then(
        (data) => {
            dispatch({
                type: GET_INVOICES_SUCCESS,
                payload: {invoicesList: data},
            });

            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.data && error.data.message) ||
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_INVOICES_FAIL,
            });

            dispatch(onError(message, "invoice"));

            return Promise.reject(message);
        }
    );
}

export const getInvoicesByUserEmail = () => (dispatch) => {
    return PaymentService.getInvoicesByUserEmail().then(
        (data) => {
            dispatch({
                type: GET_INVOICES_SUCCESS,
                payload: {invoicesList: data},
            });

            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.data && error.data.message) ||
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_INVOICES_FAIL,
            });

            dispatch(onError(message, "invoice"));

            return Promise.reject(message);
        }
    );
}

export const payInvoice = (invoiceNumber) => (dispatch) => {
    return PaymentService.payInvoice(invoiceNumber).then(
        (data) => {
            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Invoice paid successfully",
                    type: MSG_SUCCESS,
                },
            });

            dispatch(getInvoicesByUserEmail());

            return Promise.resolve(data);
        },
        (error) => {
            const message =
                (error.data && error.data.message) ||
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(onError(message, "invoice"));

            return Promise.reject(message);
        }
    );
}