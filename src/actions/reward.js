import RewardService from "../services/RewardService";
import {GET_REWARDS_FAIL, GET_REWARDS_SUCCESS, LOAD_REWARD, SET_MESSAGE} from "./types";
import {onError} from "./expiration";
import {MSG_SUCCESS} from "../config";


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

export const createReward = (reward) => (dispatch) => {
    return RewardService.createReward(reward).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Reward created successfully.",
                type: MSG_SUCCESS
            }
        });

        dispatch(getRewards());

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

export const updateReward = (reward) => (dispatch) => {
    return RewardService.updateReward(reward).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Reward updated successfully.",
                type: MSG_SUCCESS
            }
        });

        dispatch(getRewards());

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

export const enableReward = (reward) => (dispatch) => {
    return RewardService.enableReward(reward).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Reward enabled successfully.",
                type: MSG_SUCCESS
            }
        });

        dispatch(getRewards());

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

export const disableReward = (reward) => (dispatch) => {
    return RewardService.disableReward(reward).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Reward disabled successfully.",
                type: MSG_SUCCESS
            }
        });

        dispatch(getRewards());

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