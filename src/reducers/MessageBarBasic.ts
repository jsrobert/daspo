import * as ReactRedux from 'react-redux'
import {
    MessageBarActionType,
    ADD_MESSAGE,
    CLEAR_MESSAGE,
    SHOW_MESSAGE } from '../actions/MessageBarBasic'
import { MessageBarBasicStoreState } from '../model/MessageBarBasic'

// import merge from 'lodash/merge'
// import { routerReducer as routing } from 'react-router-redux'
// import { combineReducers } from 'redux'

export const initialState: MessageBarBasicStoreState = {
    messageIndex: 0,
    messageText: "loading...",
    showMessage: true
};

let nextId: number = 0;

// Updates error message to notify about the failed fetches.
const messageBarReducer = (state: MessageBarBasicStoreState = initialState, action: MessageBarActionType): MessageBarBasicStoreState => {
    //const { messageBar } = action
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messageText: action.messageText,
                messageIndex: nextId++,
                showMessage: true
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                messageText: '__CLEAR_MESSAGE__',
                messageIndex: nextId--,
                showMessage: false
            };
        case SHOW_MESSAGE:
            return {
                ...state,
                showMessage: true
            };
        default:
            return state
    }
}

export default messageBarReducer;
