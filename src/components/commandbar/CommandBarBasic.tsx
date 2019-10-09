import * as React from 'react';
import { CommandBar, ICommandBarProps, ICommandBarItemProps, ICommandBarData } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBarActionType, AddMessage } from '../../actions/MessageBarBasic';

const fs = require('fs')

export interface CommandBarProps {
    isAuthenticated?: boolean;
    cbItems?: ICommandBarItemProps[];
    cbTitle?: string;
}

export interface CommandBarState {
    isAuthenticated: boolean;
    canDownload: boolean;
}

export class CommandBarBasic extends React.Component<CommandBarProps, CommandBarState> {
    constructor(
        public props: CommandBarProps){
            super(props);
            this.getItems.bind(this);
            this.getFarItems.bind(this);
            this.getOverlflowItems.bind(this);
            this.state = {
                isAuthenticated: false,
                canDownload: true,
            }
    }

    componentDidMount():void {
        
    }

    componentWillUpdate(nextProps: CommandBarProps) {
        if(nextProps.isAuthenticated){

        }
    }

    public render(): JSX.Element {
        const { isAuthenticated } = this.state;
        const nextItems = this.props.cbItems || [];
        const { getItems } = this;
        return (
            <div>
            <CommandBar
                items={getItems()}
                overflowItems={this.getOverlflowItems()}
                farItems={this.getFarItems()}
                ariaLabel={'Use left and right arrow keys to navigate between commands'}
                title={this.props.cbTitle}
                >
            </CommandBar>
            </div>
        );
    }
    static defaultProps: CommandBarProps = {
        isAuthenticated: false,
        cbItems: [],
        cbTitle: ''
    }
    // private cbItems: ICommandBarItemProps[];
    private cbTitle: string = "Command Bar Title HERE<-"
    private excludeItem = (keyToExclude: string) => {
        if(this.props.cbItems){
            return this.props.cbItems.filter(cbItem => cbItem.key !== keyToExclude);
        }
        return [];
    }
    // Data for CommandBar
    private getItems = (): ICommandBarItemProps[] => {
        let _items: ICommandBarItemProps[] = [];
        if(this.state.isAuthenticated === false){
            _items.push({
                key : 'login',
                name: 'Log In',
                iconProps: {
                    iconName: 'PlugConnected'
                },
                onClick: () => {
                    let authContext = window.AuthContext || null;
                    if(authContext){
                        authContext.login();
                    }
                    else {
                        alert('window.AuthContext is null. Try refreshing the page.');
                    }
                }
            });
        }
        else {
            _items.push({
                key : 'logout',
                name: 'Log Out',
                iconProps: {
                    iconName: 'PlugDisconnected'
                },
                onClick: () => {
                    let authContext = window.AuthContext || null;
                    if(authContext != null){
                        authContext.logOut();
                    }
                    else {
                        alert('window.AutheContext is null. Try refreshing the page.');
                    }
                }
            });
        }
        _items.push({
            key: 'upload',
            name: 'Upload',
            iconProps: {
                iconName: 'Upload'
            },
            onClick: () => console.log('Upload'),
            href: 'https://dev.office.com/fabric',
            ['data-automation-id']: 'uploadButton'
        });
        _items.push({
            key: 'accounts',
            name: 'Accounts',
            iconProps: {
            iconName: 'Share'
            },
            onClick:this.getAccountsTwo
        });
        if(this.state.canDownload){
            _items.push({
                key: 'download',
                name: 'Download',
                iconProps: {
                iconName: 'Download'
                },
                onClick: () => this.setState({ canDownload: false })
            })
        }
        return _items;
    };

    private getOverlflowItems = () => {
        return [
            {
            key: 'move',
            name: 'Move to...',
            onClick: () => console.log('Move to'),
            iconProps: {
                iconName: 'MoveToFolder'
            }
            },
            {
            key: 'copy',
            name: 'Copy to...',
            onClick: () => console.log('Copy to'),
            iconProps: {
                iconName: 'Copy'
            }
            },
            {
            key: 'rename',
            name: 'Rename...',
            onClick: () => console.log('Rename'),
            iconProps: {
                iconName: 'Edit'
            }
            }
        ];
    };

    private getFarItems = () => {
        return [
            {
            key: 'sort',
            name: 'Sort',
            iconProps: {
                iconName: 'SortLines'
            },
            onClick: () => console.log('Sort')
            },
            {
            key: 'tile',
            name: 'Grid view',
            iconProps: {
                iconName: 'Tiles'
            },
            iconOnly: true,
            onClick: () => console.log('Tiles')
            },
            {
            key: 'info',
            name: 'Info',
            iconProps: {
                iconName: 'Info'
            },
            iconOnly: true,
            onClick: () => console.log('Info')
            }
        ];
    };

    private getAccountsTwo() {
        let _self: any = this;
        let organizationURI = window.AuthContext.config.endpoints.orgUri;
        //let getAccountsButton = document.getElementById('getAccountsButton') || document.createElement('input');
        let message = document.getElementById('message') || document.createElement('div');
        //messageBar = React.createRef<React.RefObject<IMessageBar>>();

        //let _messageBar = messageBar;
        //getAccountsButton.disabled = true;
        let retrievingAccountsMessage = document.createElement("p");
        retrievingAccountsMessage.textContent = "Retrieving 10 accounts from " + organizationURI + "/api/data/v9.1/accounts";
        message.appendChild(retrievingAccountsMessage);

        // Function to perform operation is passed as a parameter to the aquireToken method
        window.AuthContext.acquireToken(
            organizationURI,
            (error: any, token: any) => {
                let _self: CommandBarBasic = this;
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
                            // send the data to the global method
                            window.setDaspoData(accounts);
                            // save the data to disk
                            fs.writeFile("accounts_output.json", accounts, 'utf8', (err: any) => { 
                                if (err) { 
                                    console.log("An error occured while writing JSON Object to File."); 
                                    return err; 
                                } 
                                console.log("JSON file has been saved."); 
                            });
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
                        else {
                            var error = JSON.parse(this.response).error;
                            console.log(error.message);
                            errorMessage.textContent = error.message;
                        }
                    }
                };
                req.send();
            }
        );
    }

    //Function that actually retrieves the accounts
    private retrieveAccountsTwo(error: any, token: any) {
        let _self: CommandBarBasic = this;
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
                    (accounts: any) => {
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

    public renderAccounts(accounts: any) {
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
}
