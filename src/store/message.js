import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";
import {MSG_ERROR} from "../config";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { message: payload.message ? payload.message : payload,
                     type: payload.type ? payload.type : MSG_ERROR,
                     location: payload.location ? payload.location : ""};

        case CLEAR_MESSAGE:
            return { message: "",
                     type: "",
                     location: ""
            };

        default:
            return state;
    }
}