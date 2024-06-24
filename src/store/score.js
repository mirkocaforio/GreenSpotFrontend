import {
    GET_CPU_NAMES_SUCCESS,
    GET_CPU_NAMES_FAIL,
    GET_GPU_NAMES_SUCCESS,
    GET_GPU_NAMES_FAIL,
    LOGOUT
} from "../actions/types";

//TODO: VEDERE BENE I NOMI DELLE LISTE
const initialState = {
    cpusList: null,
    gpusList: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CPU_NAMES_SUCCESS:
            return {
                ...state,
                cpusList: payload.cpusList,
            };
        case GET_CPU_NAMES_FAIL:
            return {
                ...state,
                cpusList: null,
            };
        case GET_GPU_NAMES_SUCCESS:
            return {
                ...state,
                gpusList: payload.gpusList,
            };
        case GET_GPU_NAMES_FAIL:
            return {
                ...state,
                gpusList: null,
            };
        case LOGOUT:
            return {
                cpusList: null,
                gpusList: null
            };
        default:
            return state;
    }
}