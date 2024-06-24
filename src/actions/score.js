import {
    GET_CPU_NAMES_SUCCESS,
    GET_CPU_NAMES_FAIL,
    GET_GPU_NAMES_SUCCESS,
    GET_GPU_NAMES_FAIL,
    SET_MESSAGE
} from "./types";

import ScoreService from "../services/ScoreService";
import {isTokenExpired} from "../services/AuthUtils";
import {logout} from "./auth";
import {MSG_ERROR, MSG_SUCCESS, MSG_WARNING} from "../config";

//TODO: VEDERE SE IL NOME DELLA LISTA E' CORRETTO
export const getCpuNames = () => (dispatch) => {
    return ScoreService.getCpuNames().then(
        (data) => {
            dispatch({
                type: GET_CPU_NAMES_SUCCESS,
                payload: { cpusList: data },
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
                type: GET_CPU_NAMES_FAIL,
            });

            if (isTokenExpired(message)){

                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: "Session expired. Please login again.",
                        type: MSG_WARNING
                    },
                });

                dispatch(logout());
            } else {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: message,
                        type: MSG_ERROR,
                    },
                });
            }

            return Promise.reject(message);
        }
    );
}

export const getGpuNames = () => (dispatch) => {
    return ScoreService.getGpuNames().then(
        (data) => {
            dispatch({
                type: GET_GPU_NAMES_SUCCESS,
                payload: { gpusList: data },
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
                type: GET_GPU_NAMES_FAIL,
            });

            if (isTokenExpired(message)){

                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: "Session expired. Please login again.",
                        type: MSG_WARNING
                    },
                });

                dispatch(logout());
            } else {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        message: message,
                        type: MSG_ERROR,
                    },
                });
            }

            return Promise.reject(message);
        }
    );
}