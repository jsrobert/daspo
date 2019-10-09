import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// import { Router, Route, browserHistory } from 'react-router'
import { Router, Route} from 'react-router';
// import * as ReactRouterReudx from 'react-router-redux'
// import { routerReducer } from 'react-router-redux'
import { createBrowserHistory } from 'history'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import configureStore from '../store'
import App from './App'
import { Store } from 'tough-cookie';

const history = createBrowserHistory();
const store = configureStore({});

const Root = ({ store }: any) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
)
​
Root.propTypes = {
  store: PropTypes.object.isRequired
}
​
export default Root