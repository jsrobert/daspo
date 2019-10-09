import { handleActions, Action } from 'redux-actions';
import {
    ADD_MESSAGE,
    CLEAR_MESSAGE,
    SHOW_MESSAGE } from '../actions/MessageBarBasic'
import  { MessageBarMessage, MessageBarBasicStoreState } from '../model/MessageBarBasic'

let initialState: MessageBarBasicStoreState = {
    messageIndex: 0,
    messageText: "loading...",
    showMessage: true
};

export default handleActions<MessageBarBasicStoreState, MessageBarMessage>({
    [ADD_MESSAGE]: (state: MessageBarBasicStoreState, 
        action: Action<MessageBarMessage>): MessageBarBasicStoreState => {
            return {
                messageIndex: 88,
                messageText: (action.payload ? action.payload.messageText : '__handleActions EMPTY___'),
                showMessage: (action.payload ? action.payload.showMessage : false )
            };
        },
    },
    initialState
);
