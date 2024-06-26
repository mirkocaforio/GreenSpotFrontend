import {
    GET_CPU_NAMES_SUCCESS,
    GET_CPU_NAMES_FAIL,
    GET_GPU_NAMES_SUCCESS,
    GET_GPU_NAMES_FAIL,
    SET_MESSAGE
} from "./types";

import ScoreService from "../services/ScoreService";
import {onError} from "./expiration";

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

            dispatch(onError(message, "score"));

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

            dispatch(onError(message, "score"));

            return Promise.reject(message);
        }
    );
}