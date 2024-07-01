import {
    GET_RESOURCES_SUCCESS,
    GET_RESOURCES_FAIL,
    SET_MESSAGE
} from "./types";

import ResourceService from "../services/ResourceService";
import {MSG_SUCCESS, MSG_WARNING} from "../config";
import {onError} from "./expiration";

export const getAllResources = () => (dispatch) => {
    return ResourceService.getAllResources().then(
        (data) => {
            dispatch({
                type: GET_RESOURCES_SUCCESS,
                payload: {resourcesList: data},
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
                type: GET_RESOURCES_FAIL,
            });

            dispatch(onError(message, "resource"));

            return Promise.reject(message);
        }
    );

}

export const getResourceByEmail = () => (dispatch) => {
    return ResourceService.getResourceByEmail().then(
        (data) => {
            dispatch({
                type: GET_RESOURCES_SUCCESS,
                payload: {resourcesList: data},
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
                type: GET_RESOURCES_FAIL,
            });

            dispatch(onError(message, "resource"));

            return Promise.reject(message);
        }
    );
}

export const insertResource = (name, type, greenEnergyType, country, region, city, availability, kwh, memberEmail, status) => (dispatch) => {
    return ResourceService.insertResource(name, type, greenEnergyType, country, region, city, availability, kwh, memberEmail, status)
        .then(
            (data) => {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: "Resource shared successfully.",
                        type: MSG_SUCCESS
                    },
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

                dispatch(onError(message, "resource"));

                return Promise.reject(message);
            }
        );
}

export const updateResource = (id, name, type, greenEnergyType, country, region, city, availability, kwh, memberEmail) => (dispatch) => {
    return ResourceService.updateResource(id, name, type, greenEnergyType, country, region, city, availability, kwh, memberEmail).then(
        (data) => {

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Resource updated successfully.",
                    type: MSG_SUCCESS
                },
            });

            dispatch(getResourceByEmail());

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

            dispatch(onError(message, "resource"));

            return Promise.reject(message);
        }
    );
}

export const makeResourceAvailable = (id) => (dispatch) => {
    return ResourceService.makeResourceAvailable(id).then(
        (data) => {

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Resource made available successfully.",
                    type: MSG_SUCCESS
                },
            });

            dispatch(getResourceByEmail());

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

            dispatch(onError(message, "resource"));

            return Promise.reject(message);
        }
    );
}

export const makeResourceUnavailable = (id) => (dispatch) => {
    return ResourceService.makeResourceUnavailable(id).then(
        (data) => {

            dispatch({
                type: SET_MESSAGE,
                payload: {
                    message: "Resource made unavailable successfully.",
                    type: MSG_WARNING
                },
            });

            dispatch(getResourceByEmail());

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

            dispatch(onError(message, "resource"));

            return Promise.reject(message);
        }
    );
}