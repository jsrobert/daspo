import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'office-ui-fabric-core/dist/css/fabric.min.css';
import { initializeIcons, IconNames, Customizer } from 'office-ui-fabric-react';
import { TeamsCustomizations } from 'office-ui-fabric-react/lib/customizations/TeamsCustomizations';
import { loadTheme } from 'office-ui-fabric-react';

// loadTheme({
//     palette: {
//       themePrimary: '#2b8cd7',
//       themeLighterAlt: '#020609',
//       themeLighter: '#071622',
//       themeLight: '#0d2a40',
//       themeTertiary: '#1a5481',
//       themeSecondary: '#267bbc',
//       themeDarkAlt: '#3d96da',
//       themeDark: '#58a5e0',
//       themeDarker: '#80bbe8',
//       neutralLighterAlt: '#3c3939',
//       neutralLighter: '#444141',
//       neutralLight: '#514e4e',
//       neutralQuaternaryAlt: '#595656',
//       neutralQuaternary: '#5f5c5c',
//       neutralTertiaryAlt: '#7a7777',
//       neutralTertiary: '#fdfafa',
//       neutralSecondary: '#fefbfb',
//       neutralPrimaryAlt: '#fefcfc',
//       neutralPrimary: '#fcf8f8',
//       neutralDark: '#fefdfd',
//       black: '#fffefe',
//       white: '#343232',
//     }
//   });
const store = configureStore({});

initializeIcons( /* optional base url */ );

ReactDOM.render(
<Provider store={store}>
    <Customizer {...TeamsCustomizations}>
        <App history={history} />
    </Customizer>
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
