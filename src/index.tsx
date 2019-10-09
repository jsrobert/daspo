import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as ReactRouterRedux from 'react-router-redux'
// import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store'
// import { Provider } from 'react-redux';
// import reducer from './reducers';
import './index.css';
import App from './components/App';
// import Root from './components/Root';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as serviceWorker from './serviceWorker';
//import { Router, Route, Switch } from 'react-router-dom';
//import { ConnectedRouter } from 'react-router-redux';
//import { history } from './store';

initializeIcons(/* optional base url */);

const store = configureStore({})

//const history = createBrowserHistory()

//const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
    (<App />),
    document.getElementById('root')
);
/*
ReactDOM.render(
    (<Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>),
    document.getElementById('root')
);
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
