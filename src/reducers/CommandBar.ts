import * as ReactRedux from 'react-redux'
import {
    CommandBarActionType,
    HIDE_BUTTON,
    SHOW_BUTTON,
    LOGIN_CLICK,
    CHECK_AUTH,
} from '../actions/CommandBar'
import { CommandBarState } from '../model/CommandBar'

export const initialState: CommandBarState = {
    isAuthenticated: false,
    canDownload: false,
    hideButton: false,
};

let nextId: number = 0;

// Updates error message to notify about the failed fetches.
const commandBarReducer = (state: CommandBarState = initialState, action: CommandBarActionType): CommandBarState => {
    switch (action.type) {
        case HIDE_BUTTON:
            return {
                ...state,
                hideButton: action.hideButton,
            };
        case SHOW_BUTTON:
            return {
                ...state,
                hideButton: action.hideButton,
            };
        case LOGIN_CLICK:
            return {
                ...state,
            };
        case CHECK_AUTH:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
            }
        default:
            return state
    }
}

export default commandBarReducer;
