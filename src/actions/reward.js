import RewardService from "../services/RewardService";
import {GET_REWARDS_FAIL, GET_REWARDS_SUCCESS, LOAD_REWARD} from "./types";
import {onError} from "./expiration";


export const getRewards = () => (dispatch) => {
    return RewardService.getRewards().then((data) => {

        dispatch({
             type: GET_REWARDS_SUCCESS,
             payload: { rewards: data },
         });

        return Promise.resolve(data);
    }, (error) => {

        const message =
            (error.data && error.data.message) ||
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: GET_REWARDS_FAIL,
        });

        dispatch(onError(message,"rewards"));
        return Promise.reject();
    });
}

export const getRewardById = (id) => (dispatch) => {
    return RewardService.getRewardById(id).then((data) => {

        dispatch({
            type: LOAD_REWARD,
            payload: { currReward: data },
        });

        return Promise.resolve(data);
    }, (error) => {
        const message =
            (error.data && error.data.message) ||
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch(onError(message,"rewards"));
        return Promise.reject();
    });
}