import * as React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType, IMessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { PanelSmallRightExample } from 'components/panel/PanelSmallRightExample';
import { PanelSmallLeftExample } from 'components/panel/PanelSmallLeftExample';
import { DetailListDocument }  from 'components/entities/DetailListDocument';

import { LeftNav } from 'components/nav/LeftNav';
import { CommandBarBasic } from 'components/commandbar/CommandBarBasic';
import Hello from 'containers/Hello'
import configureStore, { history } from '../store'
// import { history } from '../store';
import DetailsListBasic  from '../containers/DetailsListBasic';
import MessageBarBasic from '../containers/MessageBarBasic'
import DevTools from '../containers/DevTools'
import './App.css';

const store = configureStore({});

declare global {
    interface Window {
        AuthContext: any;
        setDaspoData: (data: any) => void;
    }
}
window.AuthContext = window.AuthContext || null;

interface ApiParams {
    currentComponent: string;
    uri: string;
}

export interface AppState {
    authContext?: any;
    messages?: string[];
    apiParams?: ApiParams;
    appView?: string;
    appData?: any;
}

export interface AppProps {
    authContext?: any;
    messages?: string[];
    apiParams?: ApiParams;
    appView?: string;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.loadComponent.bind(this);
        this.renderDataView.bind(this);
        this.state = {
            authContext: {},
            messages: ['message one'],
            appView: '/',
            appData: {},
        }
        window.setDaspoData = (data: any) => {
            
            this.setState({
                appData: data,
            })
        };
    }

    executeAction(){
        let _messageBar = React.createRef<IMessageBar>();
        let _type = typeof _messageBar;
        //React.useState()

        //_messageBar.addMessage('this is the message');
        // alert('execute action' + _type);
    }
    public componentDidMount(): void {
        let user = window.AuthContext ? window.AuthContext.getCachedUser() : {};
        let name = user.profile ? user.profile.name : 'no name yet';
        // window.setDaspoData = (data: any) => {
        //     this.setState({
        //         appData: data,
        //     })
        // }
        console.log('app component did mount ' + name);
        this.loadComponent();
    }

    private loadComponent(){
        //this.props.
        let _currentMessageBar = React.createRef<IMessageBar>();
        // _currentMessageBar.
        this.setState(
            {
                apiParams: {
                    currentComponent: '',
                    uri: ''
                }        
            }
        );
    }

    public setDataView = (view: string) => {
        this.setState({
            appView: view
        })
    }

    private responseData: any = {};
    public renderDataView = (view?: string, data?: any) => {
        // let { dataView } = this.state;
        if (view === 'Accounts'){
            return (
                <DetailsListBasic />
            )
        }
        if (view === 'Contacts') {
            return (
                <DetailListDocument items={data} />
            )
        }
        return (<DetailsListBasic />)
    }

    public addMessage(){
        // this.setState({
        //     messageText: 'add method'
        // })
    }
    public showMessage(){
        // this.setState({
        //     showMessage: true
        // })
    }
    public clearMessage(){
        // this.setState({
        //     showMessage: false
        // })
    }

    public getUser(){
        //window.AuthContext = window.AuthContext || null;
        //let user = window.AuthContext ? window.AuthContext.getCachedUser() : {};
        //let name = user.profile ? user.profile.name : 'no name yet';
        //console.log('app global did mount ' + name);

        let message = window.AuthContext ? 'auth context exists\r\n' : 'auth context is NOTHING\n';
        let tempUser = window.AuthContext ? window.AuthContext.getCachedUser() : {};
        message += tempUser ? 'temp user exists\r\n' : 'temp user is NOTHING\n';
        message += tempUser.userName ? 'user.userName = ' + tempUser.userName + '\n' : 'user.userName is NOTHING\n';
        message += tempUser.profile ? 'user.profile.upn = ' + tempUser.profile.upn + '\n': 'user.profile is NOTHING\n';

        if(tempUser.profile){
            // for(var i=0; i < tempUser.profile.length; i++) {
            //     message += tempUser.profile[i];
            // }
            message += 'if statement was true\n';
        }
        alert(message);
    }

    public componentWillUnmount() : void {

    }

    public render() {
        let user = window.AuthContext ? window.AuthContext.getCachedUser() : {};
        // const {messageIndex, messageText, showMessage} = this.state;
        const { appView } = this.state.appView ? this.state : { appView:  '/' };
        const { appData } = this.state.appData ? this.state : { appData:  {} };
        const { renderDataView } = this;
        // let user = authContext.getCachedUser();
        return (
            <Provider store={store} >
            <Fabric className="App">
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                        <div id="message"></div>
                        <MessageBarBasic />
                        <LeftNav/>
                        <p><DefaultButton name="executeActionButton" id="executeActionButton" text="Execute Action" onClick={this.executeAction.bind(this)}/></p>
                        <p><DefaultButton name="getUserButton" id="getUser" text="Get User" onClick={this.getUser.bind(this)}/></p>
                        <p><DefaultButton name="getAccountsButtonName" id="getAccounts" text="Get Accounts"/></p>
                        <p><DefaultButton name="getAccountsButtonTwo" id="getAccountsTwo" text="Get Accounts Two" onClick={getAccountsTwo}/></p>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                        <div id="errorMessage"></div>
                        <CommandBarBasic />
                        <table id="accountsTable" className='hidden'>
                            <thead><tr><th>Name</th><th>City</th></tr></thead>
                            <tbody id="accountsTableBody"></tbody>
                        </table> 
                        {/* {renderDataView(appView, appData)} */}
                        {/* <div className="App-header"> */}
                            <Router history={history}>
                                <Switch>
                                    <Route exact={true} path="/" component={Hello} props={ {name:"Johnny Pants", user:user} } />
                                    <Route exact={true} path="/Solutions" component={DetailListDocument} />
                                    <Route exact={true} path="/Accounts" component={DetailListDocument} />
                                    <Route exact={true} path="/Contacts" component={DetailsListBasic} />
                                    <Route exact={true} path="/Cases" component={DetailListDocument}  />
                                </Switch>
                            </Router>
                        {/* </div> */}
                        }
                    </div>
                </div>
                {  <DevTools /> }
            </div>
            {/* <PanelSmallRightExample />
            <PanelSmallLeftExample/>
            <MessageBar
                id="ResultsMessageBar"
                onLoad={ResultsMessageBarOnLoad}
                messageBarType={MessageBarType.info}
                isMultiline={false}
                onClick={ResultsMessageBarOnClick}
                onDismiss={ResultsMessageBarDismiss}
                dismissButtonAriaLabel="Close">This is the message
            </MessageBar> */}
        </Fabric>
        </Provider>
        );
    }
}

let checked: boolean = false;
function buttonClicked(){
  checked = !checked;
  alert('clicked');
}

function ResultsMessageBarDismiss(ev: React.MouseEvent<HTMLButtonElement>): boolean {
  let button: any = ev.button;
    console.log('results message bar dismiss clicked');
    return true;
}


//function that initiates retrieval of accounts
function getAccountsTwo() {
    let organizationURI = window.AuthContext.config.endpoints.orgUri;
    //let getAccountsButton = document.getElementById('getAccountsButton') || document.createElement('input');
    let message = document.getElementById('message') || document.createElement('div');
    let retrievingAccountsMessage = document.createElement("p");

    retrievingAccountsMessage.textContent = "Retrieving 10 accounts from " + organizationURI + "/api/data/v9.1/accounts";
    message.appendChild(retrievingAccountsMessage);

    // Function to perform operation is passed as a parameter to the aquireToken method
    window.AuthContext.acquireToken(organizationURI, retrieveAccountsTwo);
}

//Function that actually retrieves the accounts
function retrieveAccountsTwo(error: any, token: any) {
    let errorMessage = document.getElementById('errorMessage') || document.createElement('input');
    let organizationURI = window.AuthContext.config.endpoints.orgUri;
    // Handle ADAL Errors.
    if (error || !token) {
        errorMessage.textContent = 'ADAL error occurred: ' + error;
        return;
    }

    var req = new XMLHttpRequest()
    req.open("GET", encodeURI(organizationURI + "/api/data/v9.1/accounts?$select=name,address1_city&$top=10"), true);
    //Set Bearer token
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState == 4 /* complete */) {
            req.onreadystatechange = null;
            if (this.status == 200) {
                var accounts = JSON.parse(this.response).value;
                appRenderAccounts(accounts);
            }
            else {
                var error = JSON.parse(this.response).error;
                console.log(error.message);
                errorMessage.textContent = error.message;
            }
        }
    };
    req.send();
}
//Function that writes account data to the accountsTable
function appRenderAccounts(accounts: any) {
    let accountsTable = document.getElementById('accountsTable') || document.createElement("table");
    let accountsTableBody = document.getElementById('accountsTableBody') || document.createElement("tbody");
    accounts.forEach(function (account: any) {
        var name = account.name;
        var city = account.address1_city;
        var nameCell = document.createElement("td");
        nameCell.textContent = name;
        var cityCell = document.createElement("td");
        cityCell.textContent = city;
        var row = document.createElement("tr");
        row.appendChild(nameCell);
        row.appendChild(cityCell);
        accountsTableBody.appendChild(row);
    });
    accountsTable.style.display = "block";
}

function ResultsMessageBarOnLoad(ev: any) {
    let message = typeof ev;
    alert(message);
}

function ResultsMessageBarOnClick(ev: any) {
    let message = typeof ev;
    alert(message);
}

function ShowMessage() {

}
export default App;

