import { GET_TASKS_FAIL, GET_TASKS_SUCCESS, SET_MESSAGE} from "./types";
import {MSG_SUCCESS, MSG_WARNING} from "../config";
import TaskService from "../services/TaskService";
import {onError} from "./expiration";


export const createTask = (data) => (dispatch) => {
    return TaskService.createTask(data).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Task created successfully.",
                type: MSG_SUCCESS
            }
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

        dispatch(onError(message,"task"));
        return Promise.reject();
    });
}

export const updateTask = (data) => (dispatch) => {
    return TaskService.updateTask(data).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Task updated successfully.",
                type: MSG_SUCCESS
            }
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

        dispatch(onError(message,"task"));
        return Promise.reject();
    });
}

export const enableTask = (data) => (dispatch) => {
    return TaskService.enableTask(data).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Task enabled successfully.",
                type: MSG_SUCCESS
            }
        });

        dispatch(getTasks());

        return Promise.resolve(data);
    }, (error) => {
        const message =
            (error.data && error.data.message) ||
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch(onError(message,"task"));
        return Promise.reject();
    });
}

export const disableTask = (data) => (dispatch) => {
    return TaskService.disableTask(data).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Task disabled successfully.",
                type: MSG_WARNING
            }
        });

        dispatch(getTasks());

        return Promise.resolve(data);
    }, (error) => {
        const message =
            (error.data && error.data.message) ||
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch(onError(message, "task"));
        return Promise.reject();
    });
}

export const stopTask = (data) => (dispatch) => {
    return TaskService.stopTask(data).then((data) => {

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: "Task killed successfully.",
                type: MSG_WARNING
            }
        });

        dispatch(getTasks());

        return Promise.resolve(data);
    }, (error) => {
        const message =
            (error.data && error.data.message) ||
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch(onError(message,"task"));
        return Promise.reject();
    });
}

export const getTasks = (data) => (dispatch) => {
    return TaskService.getTasks(data).then((data) => {

        dispatch({
            type: GET_TASKS_SUCCESS,
            payload: { tasks: data },
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
            type: GET_TASKS_FAIL,
        });

        dispatch(onError(message,"task"));
        return Promise.reject();
    });
}