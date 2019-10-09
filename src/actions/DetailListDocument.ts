export const LOAD_DATA = 'LOAD_DATA';
export type LOAD_DATA = typeof LOAD_DATA;

export interface LoadData {
    type: LOAD_DATA;
    query: string;
}

export type DetailListActionType = LoadData;

export const LoadData = (query: string): LoadData => {
    return {
        type: LOAD_DATA,
        query: query, // '/api/data/v9.1/accounts?$select=name,address1_city&$top=10'
    };
}
