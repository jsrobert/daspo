// import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// // import api from '../middleware/api'
// import rootReducer from '../reducers'
// import DevTools from '../containers/DevTools'

// const configureStore = (preloadedState: any) => {
//     const store = createStore(
//         rootReducer,
//         preloadedState,
//         compose(
//             applyMiddleware(thunk, createLogger()),
//             //applyMiddleware(thunk, api, createLogger()),
//             DevTools.instrument()
//         )
//     )
//     // const store = createStore(
//     //     rootReducer,
//     //     preloadedState,
//     //     compose(
//     //         applyMiddleware(thunk, createLogger()),
//     //         //applyMiddleware(thunk, api, createLogger()),
//     //         //DevTools.instrument()
//     //     )
//     // )
//     // const store = createStore(
//     //     messageBarBasicReducer,
//     //     preloadedState,
//     //     compose(
//     //         applyMiddleware(
//     //             thunk,
//     //             createLogger()
//     //         )
//     //     )
//     // )

//     if (module.hot) {
//         // Enable Webpack hot module replacement for reducers
//         module.hot.accept('../reducers', () => {
//             const nextRootReducer = require('../reducers').default
//             store.replaceReducer(nextRootReducer)
//         });
//     }

//     return store
// }

// export default configureStore
