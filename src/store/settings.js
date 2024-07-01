
const initialState = {
    settings: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case 'GET_SETTINGS_SUCCESS':
            return {
                ...state,
                settings: payload.settings,
            };
        case 'GET_SETTINGS_FAIL':
            return {
                ...state,
                settings: state.settings ? state.settings : null,
            };
        case 'GET_ASSIGNMENT_SETTINGS_SUCCESS':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    assignment: payload.assignment,
                },
            };
        case 'LOGOUT':
            return {
                ...state,
                settings: null,
            };
        default:
            return state;
    }
}