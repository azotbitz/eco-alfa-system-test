import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger/src";
import thunk from "redux-thunk";
import {itemReducer} from "./reducer/itemReducer";

const logger = createLogger({
    collapsed: true,
    diff: true
})

const rootReducer = combineReducers({
    item: itemReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk, logger));