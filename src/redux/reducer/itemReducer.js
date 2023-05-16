import {DELETE_ITEMS, ERROR_ITEMS, GET_ITEMS, LOADING_ITEMS} from "../actionTypes";
import {getError, getLoading, getItems, deleteItems} from "../actions";

const initialState = {
    itemsList: [],
    loader: false,
    error: null
};
export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                itemsList: action.payload,
                loader: false
            }
        case LOADING_ITEMS:
            return {
                ...state,
                loader: true
            }
        case ERROR_ITEMS:
            return {
                ...state,
                loader: false,
                error: action.payload
            }
        case DELETE_ITEMS:
            return {
                ...state,
                itemsList: state.itemsList.filter(item => item.id !== action.payload),
                loader: false
            }
        default:
            return state
    }
}

export const loadItem = () => {
    return async dispatch => {
        dispatch(getLoading())
        try {
            const response = await fetch("https://dummyjson.com/products");
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const dataMid = await response.json();
            const data = dataMid.products
            dispatch(getItems(data))
            dispatch(deleteItems(data))
        } catch (e) {
            dispatch(getError(e))
        }
    }
}