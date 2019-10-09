import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, IDetailsList, IDetailsListProps } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { createRef } from 'office-ui-fabric-react/lib/Utilities';

const _items: any[] = [];

const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: 'Value',
    fieldName: 'value',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  }
];

export interface DetailsListBasicProps {
  items: {}[];
  selectionDetails: {};
  showItemIndexInView: boolean;
}

export default class DetailsListBasic extends React.Component<
  {},
  {
    items: {}[];
    selectionDetails: {};
    showItemIndexInView: boolean;
  }
> {
  private _selection: Selection;
  private _detailsList = createRef<IDetailsList>();

  constructor(props: {}) {
    super(props);

    this._getSelectionDetails.bind(this)
    // Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 200; i++) {
        _items.push({
          key: i,
          name: 'Item ' + i,
          value: i
        });
      }
    }

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.state = {
      items: _items,
      selectionDetails: this._getSelectionDetails(),
      showItemIndexInView: false
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <div>
        <div>{selectionDetails}</div>
        <TextField label="Filter by name:" onChange={this._onChange} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            componentRef={this._detailsList}
            items={items}
            columns={_columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </div>
    );
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._detailsList!.current!.getStartItemIndexInView();
      alert('unmounting, getting first item index that was in view: ' + itemIndexInView);
    }
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({ items: text ? _items.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _items });
  };

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _onShowItemIndexInViewChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      showItemIndexInView: checked
    });
  };

  private getAccountsTwo() {
    // this._detailsList.
    let _self: DetailsListBasic = this;
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
            let _self: DetailsListBasic = this;
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
                        let accounts = JSON.parse(this.response).value;
                        window.DaspoData = accounts;
                        // let accountsTable = document.getElementById('accountsTable') || document.createElement("table");
                        // let accountsTableBody = document.getElementById('accountsTableBody') || document.createElement("tbody");
                        // accounts.forEach(function (account: any) {
                        //     var name = account.name;
                        //     var city = account.address1_city;
                        //     var nameCell = document.createElement("td");
                        //     nameCell.textContent = name;
                        //     var cityCell = document.createElement("td");
                        //     cityCell.textContent = city;
                        //     var row = document.createElement("tr");
                        //     row.appendChild(nameCell);
                        //     row.appendChild(cityCell);
                        //     accountsTableBody.appendChild(row);
                        // });
                        // accountsTable.style.display = "block";
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
}