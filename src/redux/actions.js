import {DELETE_ITEMS, ERROR_ITEMS, GET_ITEMS, LOADING_ITEMS} from "./actionTypes";

export const getItems = (data) => ({
    type: GET_ITEMS,
    payload: data
});

export const getLoading = () => ({
    type: LOADING_ITEMS
});

export const getError = (e) => ({
    type: ERROR_ITEMS,
    payload: e.toString()
});

export const deleteItems = (data) => ({
    type: DELETE_ITEMS,
    payload: data
})