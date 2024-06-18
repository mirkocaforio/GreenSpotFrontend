import {GET_TASKS_SUCCESS,GET_TASKS_FAIL, LOGOUT} from "../actions/types";

const initialState = {
    tasks: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: payload.tasks,
            };
        case GET_TASKS_FAIL:
            return {
                ...state,
                tasks: state.tasks ? state.tasks : null,
            };
        case LOGOUT:
            return {
                ...state,
                tasks: null,
            };

        default:
            return state;
    }
}
