import {ApiCall, IApiCallProps} from '../middleware/ApiCall';

export const LOAD_DATA = 'LOAD_DATA';
export type LOAD_DATA = typeof LOAD_DATA;

export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';
export type LOAD_DATA_FAILURE = typeof LOAD_DATA_FAILURE;

export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export type LOAD_DATA_SUCCESS = typeof LOAD_DATA_SUCCESS;

export const LOAD_DATA_IN_PROGRESS = 'LOAD_DATA_IN_PROGRESS';
export type LOAD_DATA_IN_PROGRESS = typeof LOAD_DATA_IN_PROGRESS;

export interface ILoadData {
    type: LOAD_DATA;
    query: string;
}

export interface ILoadDataInProgress {
    type: LOAD_DATA_IN_PROGRESS;
    inProgress: boolean;
}

export interface ILoadDataFailure {
    type: LOAD_DATA_FAILURE;
    error: string;
}

export interface ILoadDataSuccess {
    type: LOAD_DATA_SUCCESS;
    data: any;
}

export type DetailListActionType = ILoadData | ILoadDataFailure | ILoadDataSuccess;

export const LoadData = (token: any, query: string, headers: any): any => {
    let apiCall = new ApiCall({
        InProgressFunc: loadDataInProgress, 
        successFunc: loadDataSuccess, 
        failureFunc: loadDataFailure
    })
    return apiCall.FetchData(token, query, headers);
}

export const loadDataInProgress = (inProgress: boolean) => {
    return {
        type: LOAD_DATA_IN_PROGRESS,
        inProgress: inProgress
    }
};

export const loadDataSuccess = (data: any) => {
    return {
        type: LOAD_DATA_SUCCESS,
        data: data
    }
};
  
export const loadDataFailure = (error: any) => {
    return {
        type: LOAD_DATA_FAILURE,
        error: error
    }
};