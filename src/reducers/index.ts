import { routerReducer as routing } from 'react-router-redux'
import { combineReducers, ReducersMapObject } from 'redux'
import messageBarReducer  from './MessageBarBasic'
import commandBarReducer from './CommandBar'
import detailsListReducer from './DetailListDocument';
import { CommandBarState } from '../model/CommandBar';
import { IQueryListState } from '../model/DetailsList';
import { MessageBarStoreState } from '../model/MessageBarBasic'
import { HelloStoreState } from '../model/Hello'
import enthusiasm from './hello'

// The top-level state object
export interface AppState {
    messageBar: MessageBarStoreState,
    hello: HelloStoreState,
    routing: any,
    commandBar: CommandBarState,
    queryList: IQueryListState,
}

// const reducersMapObject: ReducersMapObject<AppState, any> = {
//     messageBar: messageBarReducer,
//     hello: enthusiasm,
//     routing: routing,
//     commandBar: commandBarReducer,
// }

const rootReducer = combineReducers<AppState>({
    messageBar: messageBarReducer,
    hello: enthusiasm,
    routing: routing,
    commandBar: commandBarReducer,
    queryList: detailsListReducer,
})

export default rootReducer
