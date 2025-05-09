import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import '@fluentui/react/dist/css/fabric.min.css';

const store = configureStore({});

ReactDOM.render(
<Provider store={store}>
    <App history={history} />
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
