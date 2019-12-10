import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import * as React from 'react';
import {CommandBarProps, CommandBarState} from '../../model/CommandBar';

export default class CommandBarBasic extends React.Component<CommandBarProps, CommandBarState> {

    constructor(
        public props: CommandBarProps) {
            super(props);
            this.getItems = this.getItems.bind(this);
            this.getFarItems = this.getFarItems.bind(this);
            this.getOverlflowItems = this.getOverlflowItems.bind(this);
            // this.logInClick = this.logInClick.bind(this);
            // this.checkAuth = this.checkAuth.bind(this);
            this.state = {
                isAuthenticated: false,
                canDownload: true,
                hideButton: false,
            };

    }

    public render(): JSX.Element {
        const items = this.getItems();
        return (
            <div>
            <CommandBar
                items={items}
                overflowItems={this.getOverlflowItems()}
                farItems={this.getFarItems()}
                ariaLabel={'Use left and right arrow keys to navigate between commands'}
                title={this.props.cbTitle}
                >
                {/* {isAuthenticated &&
                <CommandBarButton key='login' name='Log In'
                    disabled={this.props.isAuthenticated}
                    iconProps={{iconName:'PlugConnected'}}
                    onClick={this.logInClick}/>
                } */}
                {/* key : 'login',
                name: 'Log In',
                iconProps: {
                    iconName: 'PlugConnected'
                },
                disabled: this.state.isAuthenticated,
                onClick: this.logInClick, */}
            </CommandBar>
            </div>
        );
    }

    // Data for CommandBar
    private getItems = (): ICommandBarItemProps[] => {
        const items: ICommandBarItemProps[] = [];
        if (this.props.isAuthenticated === false) {
            items.push({
                key : 'login',
                name: 'Log In',
                iconProps: {
                    iconName: 'PlugConnected',
                },
                disabled: this.props.isAuthenticated,
                onClick: () => {
                    if (this.props.loginClick) {
                        this.props.loginClick();
                    }
                },
            });
        } else {
            items.push({
                key : 'logout',
                name: 'Log Out',
                iconProps: {
                    iconName: 'PlugDisconnected',
                },
                disabled: !this.props.isAuthenticated,
                onClick: () => {
                    if (this.props.loginClick) {
                        this.props.loginClick();
                    }
                },
            });
        }
        items.push({
            key: 'upload',
            name: 'Upload',
            iconProps: {
                iconName: 'Upload',
            },

            onClick: () => console.log('Upload'),
            href: 'https://dev.office.com/fabric',
            ['data-automation-id']: 'uploadButton',
        });
        items.push({
            key: 'accounts',
            name: 'Accounts',
            iconProps: {
            iconName: 'ContactInfo',
            },
            onClick: this.getAccountsTwo,
        });
        items.push({
            key: 'testStateButton',
            name: 'Test State',
            iconProps: {
            iconName: 'CommandPrompt',
            },
            onClick: () => {
                if (this.props.onShowButton) {
                    this.props.onShowButton();
                }
                // this.setState({
                //     isAuthenticated: !this.props.isAuthenticated
                // })
            },
        });
        if (this.state.canDownload) {
            items.push({
                key: 'download',
                name: 'Download',
                iconProps: {
                iconName: 'Download',
                },
                onClick: () => this.setState({ canDownload: false }),
            });
        }
        return items;
    }

    private getOverlflowItems = () => {
        return [
            {
            key: 'move',
            name: 'Move to...',
            onClick: () => console.log('Move to'),
            iconProps: {
                iconName: 'MoveToFolder',
            },
            },
            {
            key: 'copy',
            name: 'Copy to...',
            onClick: () => console.log('Copy to'),
            iconProps: {
                iconName: 'Copy',
            },
            },
            {
            key: 'rename',
            name: 'Rename...',
            onClick: () => console.log('Rename'),
            iconProps: {
                iconName: 'Edit',
            },
            },
        ];
    }

    private getFarItems = () => {
        return [
            {
            key: 'sort',
            name: 'Sort',
            iconProps: {
                iconName: 'SortLines',
            },
            onClick: () => console.log('Sort'),
            },
            {
            key: 'tile',
            name: 'Grid view',
            iconProps: {
                iconName: 'Tiles',
            },
            iconOnly: true,
            onClick: () => console.log('Tiles'),
            },
            {
            key: 'info',
            name: 'Info',
            iconProps: {
                iconName: 'Info',
            },
            iconOnly: true,
            onClick: () => console.log('Info'),
            },
        ];
    }

    private getAccountsTwo() {
        const organizationURI = window.authContext.config.endpoints.orgUri;
        // let getAccountsButton = document.getElementById('getAccountsButton') || document.createElement('input');
        const message = document.getElementById('message') || document.createElement('div');
        // messageBar = React.createRef<React.RefObject<IMessageBar>>();

        // let _messageBar = messageBar;
        // getAccountsButton.disabled = true;
        const retrievingAccountsMessage = document.createElement("p");
        retrievingAccountsMessage.textContent = "Retrieving 10 accounts from " + organizationURI + "/api/data/v9.1/accounts";
        message.appendChild(retrievingAccountsMessage);

        // Function to perform operation is passed as a parameter to the aquireToken method
        window.authContext.acquireToken(
            organizationURI,
            (error: any, token: any) => {
                const errorMessage = document.getElementById('errorMessage') || document.createElement('input');
                const orgUrl = window.authContext.config.endpoints.orgUri;
                // Handle ADAL Errors.
                if (error || !token) {
                    errorMessage.textContent = 'ADAL error occurred: ' + error;
                    return;
                }

                const req = new XMLHttpRequest();
                req.open("GET", encodeURI(organizationURI + "/api/data/v9.1/accounts?$select=name,address1_city&$top=10"), true);
                // Set Bearer token
                req.setRequestHeader("Authorization", "Bearer " + token);
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.onreadystatechange = function() {
                    if (this.readyState === 4 /* complete */) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            const accounts = JSON.parse(this.response).value;
                            // send the data to the global method
                            window.setDaspoData(accounts);
                            // save the data to disk
                            // fs.writeFile("accounts_output.json", accounts, 'utf8', (err: any) => {
                            //     if (err) {
                            //         console.log("An error occured while writing JSON Object to File.");
                            //         return err;
                            //     }
                            //     console.log("JSON file has been saved.");
                            // });
                            const accountsTable = document.getElementById('accountsTable') || document.createElement("table");
                            const accountsTableBody = document.getElementById('accountsTableBody') || document.createElement("tbody");
                            accounts.forEach((account: any) => {
                                const name = account.name;
                                const city = account.address1_city;
                                const nameCell = document.createElement("td");
                                nameCell.textContent = name;
                                const cityCell = document.createElement("td");
                                cityCell.textContent = city;
                                const row = document.createElement("tr");
                                row.appendChild(nameCell);
                                row.appendChild(cityCell);
                                accountsTableBody.appendChild(row);
                            });
                            accountsTable.style.display = "block";
                        } else {
                            const aquireTokenError = JSON.parse(this.response).error;
                            console.log(aquireTokenError.message);
                            errorMessage.textContent = aquireTokenError.message;
                        }
                    }
                };
                req.send();
            },
        );
    }
/*
    //Function that actually retrieves the accounts
    // private retrieveAccountsTwo(error: any, token: any) {
    //     let _self: CommandBarBasic = this;
    //     let errorMessage = document.getElementById('errorMessage') || document.createElement('input');
    //     let organizationURI = window.authContext.config.endpoints.orgUri;
    //     // Handle ADAL Errors.
    //     if (error || !token) {
    //         errorMessage.textContent = 'ADAL error occurred: ' + error;
    //         return;
    //     }

    //     var req = new XMLHttpRequest()
    //     req.open("GET", encodeURI(organizationURI + "/api/data/v9.1/accounts?$select=name,address1_city&$top=10"), true);
    //     //Set Bearer token
    //     req.setRequestHeader("Authorization", "Bearer " + token);
    //     req.setRequestHeader("Accept", "application/json");
    //     req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //     req.setRequestHeader("OData-MaxVersion", "4.0");
    //     req.setRequestHeader("OData-Version", "4.0");
    //     req.onreadystatechange = function () {
    //         if (this.readyState == 4 ) {
    //             req.onreadystatechange = null;
    //             if (this.status == 200) {
    //                 var accounts = JSON.parse(this.response).value;
    //                 (accounts: any) => {
    //                     let accountsTable = document.getElementById('accountsTable') || document.createElement("table");
    //                     let accountsTableBody = document.getElementById('accountsTableBody') || document.createElement("tbody");
    //                     accounts.forEach(function (account: any) {
    //                         var name = account.name;
    //                         var city = account.address1_city;
    //                         var nameCell = document.createElement("td");
    //                         nameCell.textContent = name;
    //                         var cityCell = document.createElement("td");
    //                         cityCell.textContent = city;
    //                         var row = document.createElement("tr");
    //                         row.appendChild(nameCell);
    //                         row.appendChild(cityCell);
    //                         accountsTableBody.appendChild(row);
    //                     });
    //                     accountsTable.style.display = "block";
    //                 }
    //             }
    //             else {
    //                 var error = JSON.parse(this.response).error;
    //                 console.log(error.message);
    //                 errorMessage.textContent = error.message;
    //             }
    //         }
    //     };
    //     req.send();
    // }
    */
}
