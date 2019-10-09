import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import messageBarReducer  from './MessageBarBasic'
import { MessageBarStoreState } from '../model/MessageBarBasic'
import HelloStoreState from '../model/Hello'
import enthusiasm from './hello'

// The top-level state object
export interface AppState {
    messageBar: MessageBarStoreState,
    hello: HelloStoreState,
    routing: any
}

const rootReducer = combineReducers<AppState>({
    messageBar: messageBarReducer,
    hello: enthusiasm,
    routing: routing
})

export default rootReducer
