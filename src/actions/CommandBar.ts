export const HIDE_BUTTON = 'HIDE_BUTTON';
export type HIDE_BUTTON = typeof HIDE_BUTTON;

export const SHOW_BUTTON = 'SHOW_BUTTON';
export type SHOW_BUTTON = typeof SHOW_BUTTON;

export const LOGIN_CLICK = 'LOGIN_CLICK';
export type LOGIN_CLICK = typeof LOGIN_CLICK;

export const LOGOUT_CLICK = 'LOGOUT_CLICK';
export type LOGOUT_CLICK = typeof LOGOUT_CLICK;

export const CHECK_AUTH = 'CHECK_AUTH';
export type CHECK_AUTH = typeof CHECK_AUTH;

export interface IHideButton {
    type: HIDE_BUTTON;
    hideButton: boolean;
}

export interface IShowButton {
    type: SHOW_BUTTON;
    hideButton: boolean;
}

export interface ILoginClick {
    type: LOGIN_CLICK;
}
export interface ILogoutClick {
    type: LOGOUT_CLICK;
    isAuthenticated: boolean;
}
export interface ICheckAuth {
    type: CHECK_AUTH;
    isAuthenticated: boolean;
}

export type CommandBarActionType = IHideButton | IShowButton | ILoginClick | ILogoutClick | ICheckAuth;

export const hideButton = (): IHideButton => {
    return {
        type: HIDE_BUTTON,
        hideButton: true,
    };
}

export const showButton = (): IShowButton => {
    return {
        type: SHOW_BUTTON,
        hideButton: false,
    }
}

export const loginClick = (): ILoginClick => {
    if(window && window.authContext){
        window.authContext.login();
    }
    return {
        type: LOGIN_CLICK,
    }
}

export const logoutClick = (): ILogoutClick => {
    if(window && window.authContext){
        window.authContext.logout();
    }
    return {
        type: LOGOUT_CLICK,
        isAuthenticated: false,
    }
}

export const checkAuth = (): ICheckAuth => {
    return {
        type: CHECK_AUTH,
        isAuthenticated: checkUserAuth()
    }
}

export const checkUserAuth = () => {
    if(window && window.authContext){
        const user = window.authContext.getCachedUser();
        const userName = user.userName;
        return true;
    }
    return false;
}