import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    IColumn,
    IDetailsList,
    IDetailsListProps,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
// import { createRef } from 'office-ui-fabric-react/lib/Utilities';

const defaultItems: any[] = [];

const columnConfig: IColumn[] = [
    {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        ariaLabel: 'Operations for name',
    },
    {
        key: 'column2',
        name: 'Value',
        fieldName: 'value',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        ariaLabel: 'Operations for value',
    },
];

export interface IDetailsListBasicProps {
    items: any[];
    selectionDetails: {};
    showItemIndexInView: boolean;
}

export default class DetailsListBasic extends React.Component<
    {},
    {
        items: any[]
        selectionDetails: {}
        showItemIndexInView: boolean,
    }
> {
    private currentSelection: Selection;
    // private _detailsList: IDetailsList;

    constructor(props: {}) {
        super(props);

        this.getListSelectionDetails.bind(this);
        // Populate with items for demos.
        if (defaultItems.length === 0) {
            for (let i = 0; i < 200; i++) {
                defaultItems.push({
                    key: i,
                    name: 'Item ' + i,
                    value: i,
                });
            }
        }

        this.currentSelection = new Selection({
            onSelectionChanged: () =>
                this.setState({
                    selectionDetails: this.getListSelectionDetails(),
                }),
        });

        this.state = {
            items: defaultItems,
            selectionDetails: this.getListSelectionDetails(),
            showItemIndexInView: false,
        };
    }

    public render(): JSX.Element {
        const { items, selectionDetails } = this.state;

        return (
            <div>
                <div>{selectionDetails}</div>
                <TextField
                    label="Filter by name:"
                    onChange={this.onChangeList}
                />
                <MarqueeSelection selection={this.currentSelection}>
                    <DetailsList
                        // componentRef={this._detailsList}
                        items={items}
                        columns={columnConfig}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        selection={this.currentSelection}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        onItemInvoked={this.onListItemInvoked}
                    />
                </MarqueeSelection>
            </div>
        );
    }

    public componentWillUnmount() {
        if (this.state.showItemIndexInView) {
            // const itemIndexInView = this.state!.selectionDetails.getStartItemIndexInView();
            // alert('unmounting, getting first item index that was in view: ' + itemIndexInView);
        }
    }

    private getListSelectionDetails(): string {
        const selectionCount = this.currentSelection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return (
                    '1 item selected: ' +
                    (this.currentSelection.getSelection()[0] as any).name
                );
            default:
                return `${selectionCount} items selected`;
        }
    }

    private onChangeList = (
        ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        text: string | undefined,
    ): void => {
        this.setState({
            items: text
                ? defaultItems.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
                : defaultItems,
        });
    }

    private onListItemInvoked(item: any): void {
        alert(`Item invoked: ${item.name}`);
    }
}
