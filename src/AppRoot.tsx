import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as router from 'react-router';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBar, MessageBarType, IMessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { createRef } from 'office-ui-fabric-react/lib/Utilities';
import { PanelSmallRightExample } from 'components/panel/PanelSmallRightExample';
import { PanelSmallLeftExample } from 'components/panel/PanelSmallLeftExample';
import { DetailListDocument }  from 'components/entities/DetailListDocument';
import { GridLayout } from 'components/layout/Grid';
import { LeftNav } from 'components/nav/LeftNav';
import { CommandBarBasic } from 'components/commandbar/CommandBarBasic';
import Start from 'components/Start';
import { history } from './store';
import MessageBarBasic from './containers/MessageBarBasic'
import './App.css';
// import { Nav, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
// import { Layer } from 'office-ui-fabric-react/lib/Layer'
// import * as AdalNode from 'adal-node';
// import { AuthenticationContext, AuthenticationParameters, TokenResponse, AcquireTokenCallback, ErrorResponse, LoggingOptions } from 'adal-node';
// import { authContext } from 'middleware/ReactAdal';

declare global {
    interface Window {
        AuthContext: any;
        DaspoData: any;
    }
}
window.AuthContext = window.AuthContext || null;
let AdalUser = window.AuthContext ? window.AuthContext.getCachedUser() : null;

const AppRoot = (store: any, history: any ) => {
    <Provider store={store} >
        <Fabric className="App">
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                        <div id="message"></div>
                        {/* <MessageBarBasic onAddMessage={getUser} onShowMessage={getUser}/> */}
                            <LeftNav/>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                        <div id="errorMessage"></div>
                        <CommandBarBasic />
                        <table id="accountsTable" className='hidden'>
                            <thead><tr><th>Name</th><th>City</th></tr></thead>
                            <tbody id="accountsTableBody"></tbody>
                        </table>
                        <div className="App-header">
                            <Router history={history}>
                                <Switch>
                                    <Route path="/" component={Start} props={AdalUser} />
                                    <Route path="/Entities" component={DetailListDocument} />
                                </Switch>
                            </Router>
                        </div>
                        <PrimaryButton name="logOutButtonName" id="logout" text="Log Out" />
                        <DefaultButton name="getAccountsButtonName" id="getAccounts" text="Get Accounts"/>
                        <DefaultButton name="getUserButton" id="getUser" text="Get User" onClick={getUser}/>
                        <DefaultButton name="getAccountsButtonTwo" id="getAccountsTwo" text="Get Accounts Two" onClick={() => { window.location.href = 'www.msn.com'; }}/>
                    </div>
                </div>
            </div>
        </Fabric>
    </Provider>
}

function getUser(){
    return window.AuthContext ? window.AuthContext.getCachedUser() : null;
}

// AppRoot.propTypes = {
//     store: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
// }

export default AppRoot;

