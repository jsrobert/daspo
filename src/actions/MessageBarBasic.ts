export const ADD_MESSAGE = 'ADD_MESSAGE';
export type ADD_MESSAGE = typeof ADD_MESSAGE;

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export type CLEAR_MESSAGE = typeof CLEAR_MESSAGE;

export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export type SHOW_MESSAGE = typeof SHOW_MESSAGE;

let nextId = 0
export interface AddMessage {
    type: ADD_MESSAGE;
    messageIndex: number;
    messageText: string;
    showMessage: boolean;
}

export interface ShowMessage {
    type: SHOW_MESSAGE;
    messageIndex: number,
    showMessage: boolean
}

export interface ClearMessage {
    type: CLEAR_MESSAGE;
    messageIndex: number;
    showMessage: boolean;
}

export type MessageBarActionType = AddMessage | ClearMessage | ShowMessage;

export const addMessageText = (newText: string): AddMessage => {
    return {
        type: ADD_MESSAGE,
        messageIndex: nextId++,
        messageText: newText,
        showMessage: true
    };
}

export const clearMessageText = (index: number): ClearMessage => {
    return {
        type: CLEAR_MESSAGE,
        messageIndex: index,
        showMessage: false
    }
}

export const showMessageText = (index: number): ShowMessage => {
    return {
        type: SHOW_MESSAGE,
        messageIndex: index,
        showMessage: true
    }
}
