import * as React from 'react'
import input from 'react-dom'
import CommandBarBasic from '../containers/CommandBar'
import DetailListDocument from '../containers/DetailListDocument'
import { Navigation } from '../data/Navigation'
// import './App.scss';
import { LeftNav } from './nav/LeftNav'
import {
    DefaultButton,
    Fabric,
    MessageBar,
    IMessageBar,
    initializeIcons,
    IconNames,
    Customizer,
    IPalette,
    IPartialTheme,
    ITheme,
    createTheme,
    MessageBarType,
    IMessageBarProps,
} from 'office-ui-fabric-react'
import { TeamsCustomizations } from 'office-ui-fabric-react/lib/customizations/TeamsCustomizations'
import { AnyMxRecord } from 'dns'

// tslint:disable-next-line: no-var-requires
const paletteDark: IPartialTheme = require('../theme/palette.dark.json')

const messageBarProps: IMessageBarProps = {
    messageBarType: MessageBarType.severeWarning,
    ariaLabel: "This is a severe warning."
}

// const appTheme: ITheme = createTheme(paletteDark);

const appTheme = createTheme({
    palette: {
        themePrimary: 'red',
    },
})

initializeIcons()

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        authContext: any
        setDaspoData: (data: any) => void
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}
window.authContext = window.authContext || null

interface IApiParams {
    currentComponent: string
    uri: string
}

export interface IAppState {
    authContext?: any
    messages?: string[]
    apiParams?: IApiParams
    appView?: string
    appData?: any
    messageExists?: boolean
}

export interface IAppProps {
    authContext?: any
    messages?: string[]
    apiParams?: IApiParams
    appView?: string
    appData?: any
    history?: any
}

class App extends React.Component<IAppProps, IAppState> {
    private detailListDocument: any;
    constructor(props: IAppProps) {
        super(props)

        // this.detailListDocument = React.createRef()
        this.getUser.bind(this)
        this.executeAction.bind(this)
        this.loadComponent.bind(this)
        this.renderDataView.bind(this)
        this.handleNavigation.bind(this)
        this.state = {
            appData: {},
            appView: '/',
            authContext: window.authContext,
            messages: ['message one'],
            messageExists: false,
        }
        window.setDaspoData = (data: any) => {
            console.log('window.setDaspoData fired')
            this.setState({
                appData: data,
            })
        }
    }

    public executeAction = (event: any) => {
        // let _messageBar = React.createRef<IMessageBar>();
        // React.useState()
        // _messageBar.addMessage('this is the message');
        // alert('execute action' + _type);
        
    }

    public renderDataView = () => {
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

    public getUser = () => {
        let message = window.authContext
            ? 'auth context exists\r\n'
            : 'auth context is NOTHING\n'
        const tempUser = window.authContext
            ? window.authContext.getCachedUser()
            : {}
        message += tempUser ? 'temp user exists\r\n' : 'temp user is NOTHING\n'
        message += tempUser.userName
            ? 'user.userName = ' + tempUser.userName + '\n'
            : 'user.userName is NOTHING\n'
        message += tempUser.profile
            ? 'user.profile.upn = ' + tempUser.profile.upn + '\n'
            : 'user.profile is NOTHING\n'

        if (tempUser.profile) {
            // for(var i=0; i < tempUser.profile.length; i++) {
            //     message += tempUser.profile[i];
            // }
            message += 'if statement was true\n'
        }
        alert(message)
    }

    public handleNavigation = (ev: any, item: any) => {
        console.warn('handleNavigation *************')
        if (item) {
            console.warn('handleNavigation ****** item *******')
            this.setState({
                appView: item.url,
            })
        }
        return true
    }

    public componentDidMount(): void {
        const user = window.authContext ? window.authContext.getUser() : {}
        const name = user.profile ? user.profile.name : 'no name yet'
        // window.setDaspoData = (data: any) => {
        //     this.setState({
        //         appData: data,
        //     })
        // }
        console.log('app component did mount ' + name)
        // this.loadComponent();
        if (window.top) {
            console.log('window.top exists')
        }
        if (window === window.top) {
            console.log('this is the top window')
        }
        // this.authContextCallApi(this.authContextCallback);
    }

    public componentWillUnmount(): void {
        console.log('app component will unmount')
    }

    public render() {
        const { appData } = this.props.appData ? this.props : { appData: {} }
        const { executeAction, getUser, handleNavigation } = this

        return (
            <Customizer settings={{ appTheme }}>
                <Fabric applyThemeToBody>
                    {/* <div className="App-wrapper">
                        <div className="App-content">
                            <div className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                        <div id="message"></div>
                                        <LeftNav groups={Navigation.defaultGroups} onLinkClick={handleNavigation} selectedKey={this.state.appView} />
                                        <p><DefaultButton name="executeActionButton" id="executeActionButton" text="Execute Action" onClick={() => executeAction}/></p>
                                        <p><DefaultButton name="getUserButton" id="getUser" text="Get User" onClick={() => getUser}/></p>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                                        <div id="errorMessage"/>
                                        <CommandBarBasic items={[]} />
                                        <table id="accountsTable" className='hidden'>
                                            <thead><tr><th>Name</th><th>City</th></tr></thead>
                                            <tbody id="accountsTableBody"/>
                                        </table>
                                        <DetailListDocument items={appData} data={this.state.appView} query={this.state.appView}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                            <MessageBar messageBarType={messageBarProps.messageBarType} />
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                <LeftNav
                                    groups={Navigation.defaultGroups}
                                    onLinkClick={handleNavigation}
                                    selectedKey={this.state.appView}
                                />
                                <p>
                                    <DefaultButton
                                        name="executeActionButton"
                                        id="executeActionButton"
                                        text="Create Message"
                                        onClick={executeAction}
                                    />
                                </p>
                                <p>
                                    <DefaultButton
                                        name="getUserButton"
                                        id="getUser"
                                        text="Get User"
                                        onClick={() => getUser}
                                    />
                                </p>
                                <p>
                                    <input type="time" />
                                </p>
                            </div>
                            <div>
                                <CommandBarBasic items={[]} />
                                <DetailListDocument
                                    items={appData}
                                    data={this.state.appView}
                                    query={this.state.appView}
                                />
                            </div>
                        </div>
                    </div>
                </Fabric>
            </Customizer>
        )
    }

    private loadComponent = () => {
        // this.props.
        // let _currentMessageBar = React.createRef<IMessageBar>();
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
}

const checked: boolean = false

export default App
