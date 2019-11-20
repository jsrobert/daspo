import * as constants from '../constants';

export interface Connect {
    type: constants.CONNECT;
}

export interface Disconnect {
    type: constants.DISCONNECT;
}

export type ConnectionActionType = Connect | Disconnect;

export function connect(): Connect {
    return {
        type: constants.CONNECT
    };
}

export function disconnect(): Disconnect {
    return {
        type: constants.DISCONNECT
    };
}
