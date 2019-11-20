import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType, IMessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { PanelSmallRightExample } from './panel/PanelSmallRightExample';
import { PanelSmallLeftExample } from './panel/PanelSmallLeftExample';
import { LeftNav } from './nav/LeftNav';
import { Navigation } from '../data/Navigation';
import CommandBarBasic from '../containers/CommandBar';
import Hello from '../containers/Hello';
// import configureStore, { history } from '../store';
import DetailListDocument  from '../containers/DetailListDocument';
import DetailsListBasic  from '../containers/DetailsListBasic';
import MessageBarBasic from '../containers/MessageBarBasic';
// import DevTools from '../containers/DevTools';
import './App.scss';
 
// const store = configureStore({});
 
declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        authContext: any;
        setDaspoData: (data: any) => void;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
window.authContext = window.authContext || null;

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
    appData?: any;
    history: any;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.detailListDocument = React.createRef();
        this.getUser.bind(this);
        this.executeAction.bind(this);
        this.loadComponent.bind(this);
        this.renderDataView.bind(this);
        this.handleNavigation.bind(this); 
        this.state = {
            authContext: window.authContext,
            messages: ['message one'],
            appView: '/',
            appData: {},
        }
        window.setDaspoData = (data: any) => {
            console.log('window.setDaspoData fired');
            this.setState({
                appData: data,
            })
        };
    }
 
    executeAction = (ev: React.MouseEvent<HTMLElement> | undefined) => {
        let _messageBar = React.createRef<IMessageBar>();
        let _type = typeof _messageBar;
        //React.useState()

        //_messageBar.addMessage('this is the message');
        // alert('execute action' + _type);
    }
    private detailListDocument:any;

    private loadComponent = () => {
        //this.props.
        //let _currentMessageBar = React.createRef<IMessageBar>();
        // _currentMessageBar.
        // this.setState(
        //     {
        //         apiParams: {
        //             currentComponent: '',
        //             uri: ''
        //         }        
        //     }
        // );
    }

    // public setDataView = (view: string) => {
    //     this.setState({
    //         appView: view
    //     })
    // }

    private responseData: any = {};
    public renderDataView = (view?: string, data?: any) => {
        // // let { dataView } = this.state;
        // if (view === 'Accounts'){
        //     return (
        //         <DetailsListBasic />
        //     )
        // }
        // if (view === 'Contacts') {
        //     return (
        //         <DetailListDocument items={data} />
        //     )
        // }
        // return (<DetailsListBasic />)
    }

    public addMessage = () => {
        // this.setState({
        //     messageText: 'add method'
        // })
    }
    public showMessage = () => {
        // this.setState({
        //     showMessage: true
        // })
    }
    public clearMessage = () => {
        // this.setState({
        //     showMessage: false
        // })
    }

    public getUser = (ev: React.MouseEvent<HTMLElement> | undefined) => {
        //window.authContext = window.authContext || null;
        //let user = window.authContext ? window.authContext.getCachedUser() : {};
        //let name = user.profile ? user.profile.name : 'no name yet';
        //console.log('app global did mount ' + name);

        let message = window.authContext ? 'auth context exists\r\n' : 'auth context is NOTHING\n';
        let tempUser = window.authContext ? window.authContext.getCachedUser() : {};
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

    public handleNavigation = (ev: any, item: any) => {
        console.warn('handleNavigation *************');
        if(item){
            console.warn('handleNavigation ****** item *******');
            this.setState({
                appView: item.url,
            })
        }
        const trigger = ev ? ev.preventDefault() : null;
        return true;
    }

    public componentDidMount(): void {
        let cachedUser = window.authContext ? window.authContext.getCachedUser() : {};
        let user = window.authContext ? window.authContext.getUser() : {};
        let name = user.profile ? user.profile.name : 'no name yet';
        // window.setDaspoData = (data: any) => {
        //     this.setState({
        //         appData: data,
        //     })
        // }
        console.log('app component did mount ' + name);
        // this.loadComponent();
        if(window.top){
            console.log("window.top exists");
        }
        if(window === window.top){
            console.log("this is the top window");
        }
        //this.authContextCallApi(this.authContextCallback);
    }

    public componentWillUnmount() : void {
        console.log('app component will unmount');
    }

    public render() {
        let user = window.authContext ? window.authContext.getCachedUser() : {};
        // const {messageIndex, messageText, showMessage} = this.state;
        // const { appView } = this.state.appView ? this.state : { appView:  '/' };
        const { appData } = this.props.appData ? this.props : { appData:  {} };
        const { renderDataView, executeAction, getUser, handleNavigation } = this;
        // let user = authContext.getCachedUser();
        return (
            <Fabric className="App">
                <div className="App-wrapper">
                    <div className="App-content">
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                    <div id="message"></div>
                                    {/* <MessageBarBasic /> */}
                                    <LeftNav groups={Navigation.defaultGroups} onLinkClick={handleNavigation} selectedKey={this.state.appView} />
                                    <p><DefaultButton name="executeActionButton" id="executeActionButton" text="Execute Action" onClick={(e) => executeAction}/></p>
                                    <p><DefaultButton name="getUserButton" id="getUser" text="Get User" onClick={(e) => getUser}/></p>
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                                    <div id="errorMessage"></div>
                                    <CommandBarBasic items={[]} />
                                    <table id="accountsTable" className='hidden'>
                                        <thead><tr><th>Name</th><th>City</th></tr></thead>
                                        <tbody id="accountsTableBody">                                          
                                        </tbody>
                                    </table> 
                                    <DetailListDocument ref={this.detailListDocument} items={appData} data={this.state.appView} query={this.state.appView}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fabric>
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

