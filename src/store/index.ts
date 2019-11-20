import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import * as middleware from '../middleware';
import rootReducer from '../reducers';

// create the history 
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
      return applyMiddleware(
        myRouterMiddleware,
        middleware.promiseMiddleware,
        middleware.localStorageMiddleware,
        middleware.dataFormattingMiddleware,
        thunkMiddleware,
      );
  } else {
      // Enable additional logging in non-production environments.
      return applyMiddleware(
        myRouterMiddleware,
        middleware.promiseMiddleware,
        middleware.localStorageMiddleware,
        middleware.dataFormattingMiddleware,
        thunkMiddleware,
        createLogger(),
      );
  }
};

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    getMiddleware(),
    // other store enhancers if any
);

const configureStore = (preloadedState: any) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    )

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers').default
    //         store.replaceReducer(nextRootReducer)
    //     });
    // }

    return store;
}
export default configureStore;
