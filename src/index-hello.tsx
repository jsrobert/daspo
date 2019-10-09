import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import enthusiasm from 'reducers/hello';
import HelloStoreState from './model/Hello';

import './index.css';

// const store = createStore<StoreState>(enthusiasm, {
//   enthusiasmLevel: 1,
//   languageName: 'TypeScript',
// });

const store = createStore(enthusiasm);
ReactDOM.render(
  <Provider store={store}>)
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
