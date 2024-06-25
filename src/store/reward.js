import {
    GET_REDEEMS_FAIL,
    GET_REDEEMS_SUCCESS,
    GET_REWARDS_FAIL,
    GET_REWARDS_SUCCESS,
    LOAD_REWARD,
    LOGOUT
} from "../actions/types";

const initialState = {
    rewards: null,
    currReward: null,
    redeems: null,
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_REWARDS_SUCCESS:
            return {
                ...state,
                rewards: payload.rewards,
            };
        case GET_REWARDS_FAIL:
            return {
                ...state,
                rewards: state.rewards ? state.rewards : null,
            };
        case LOAD_REWARD:
            return {
                ...state,
                currReward: payload.currReward,
            };
        case GET_REDEEMS_SUCCESS:
            return {
                ...state,
                redeems: payload.redeems,
            };
            case GET_REDEEMS_FAIL:
        return {
                ...state,
                redeems: state.redeems ? state.redeems : null,
            };
        case LOGOUT:
            return {
                ...state,
                rewards: null,
            };
        default:
            return state;
    }
}