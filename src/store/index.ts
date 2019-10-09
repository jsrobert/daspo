import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import * as middleware from '../middleware'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
      return applyMiddleware(
        myRouterMiddleware,
        middleware.promiseMiddleware,
        middleware.localStorageMiddleware,
        thunk
      );
  } else {
      // Enable additional logging in non-production environments.
      return applyMiddleware(
        myRouterMiddleware,
        middleware.promiseMiddleware,
        middleware.localStorageMiddleware,
        thunk,
        createLogger()
      );
  }
};

const configureStore = (preloadedState: any) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            composeWithDevTools(getMiddleware()),
            DevTools.instrument()
        )
    )

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers').default
    //         store.replaceReducer(nextRootReducer)
    //     });
    // }

    return store
}
export default configureStore
