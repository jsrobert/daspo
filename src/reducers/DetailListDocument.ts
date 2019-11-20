import * as ReactRedux from 'react-redux'
import {
    DetailListActionType,
    ILoadData,
    LOAD_DATA,
    LOAD_DATA_FAILURE,
    LOAD_DATA_SUCCESS,
    LoadData
} from '../actions/DetailListDocument'
import { IQueryListState } from '../model/DetailsList'
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, IDetailsListProps, IDetailsListState } from 'office-ui-fabric-react/lib/DetailsList';
// import merge from 'lodash/merge'
// import { routerReducer as routing } from 'react-router-redux'
// import { combineReducers } from 'redux'

export const initialOpenState: IDetailsListState = {
    focusedItemIndex: 1,
    adjustedColumns: [],
    version: '2.0.0',
}

export const initialProps: IDetailsListProps = {
    items: [],
}

export const initialState: IQueryListState = {
    query: "",
    inProgress: false,
    data: {},
    error: {},
    columns: [],
    items: [],
    focusedItemIndex: 0,
    adjustedColumns: [],
    version: '2.0.0',
};

let nextId: number = 0;

// Updates error message to notify about the failed fetches.
const detailListReducer = (state: IQueryListState = initialState, action: DetailListActionType): IQueryListState => {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                query: action.query,
            };
        case LOAD_DATA_SUCCESS:
            return {
                ...state,
                data: action.data,
                items: action.data,
            };
        case LOAD_DATA_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state
    }
}

export default detailListReducer;
