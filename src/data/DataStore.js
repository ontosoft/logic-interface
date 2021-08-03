import { applyMiddleware, combineReducers, createStore } from "redux"
import { asyncActions } from "./asyncMiddleware";
import { multiActions } from "./multiActionMiddleware";
import { ModelReducer } from "./ModelReducer";
import { StateReducer } from "./StateReducer";

export const DataStore = createStore(combineReducers(
    { 
        modelData: ModelReducer,
        stateData: StateReducer
    }
), applyMiddleware(asyncActions, multiActions));