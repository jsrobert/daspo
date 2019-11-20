import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  IDetailsListProps,
  IDetailsListState,
  buildColumns
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { lorem } from 'office-ui-fabric-react/lib/utilities/exampleData';
import ButtonPanel from '../commandbar/ButtonPanel';
import { IQueryListState, IQueryListProps, IDocument } from '../../model/DetailsList'
import { fileIcons } from '../../constants/FileIcons'
import './DetailList.scss';
// import './DetailList.css';

let _items: IDocument[] = [];

export class DetailListDocument extends React.Component<IQueryListProps, IQueryListState> {
  private _selection: Selection;

  constructor(props: IQueryListProps) {
    super(props);
    let test = this.props.query;
    //_items = this.props.data;

    /********************************* 
     buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey, isMultiline)
    *****/
    // let canResizeColumns = false;
    // onColumnClick
    // sortedColumnKey
    // isSortedDescending 
    // groupedColumnKey
    // isMultiline
    // buildColumns( this.props.items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey, isMultiline)

    
    //  Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 50; i++) {
        const randomDate = this._randomDate(new Date(2012, 0, 1), new Date());
        const randomFileSize = this._randomFileSize();
        const randomFileType = this._randomFileIcon();
        let fileName: string = lorem(2).replace(/\W/g, '');
        let userName: string = lorem(2).replace(/[^a-zA-Z ]/g, '');
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);
        userName = userName
          .split(' ')
          .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
          .join(' ');
        _items.push({
          name: fileName,
          value: fileName,
          iconName: randomFileType.url,
          modifiedBy: userName,
          dateModified: randomDate.dateFormatted,
          dateModifiedValue: randomDate.value,
          fileSize: randomFileSize.value,
          fileSizeRaw: randomFileSize.rawSize
        });
      }
      _items = this._sortItems(_items, 'name');
    }

   

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
          // isModalSelection: this._selection.isModal()
        });
      }
    });

    this.state = {
      items: _items,
      columns: this._getColumns(),
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: true, //this._selection.isModal(),
      isCompactMode: true, //false,
      focusedItemIndex: 1,
      adjustedColumns: [],
      query: '',
      inProgress: false,
      data: {},
      error: '',
      version: '',
    };
  }
  
  public render() {
    const { columns, isCompactMode, items, selectionDetails, isModalSelection, data } = this.state;
    const { _onChangeCompactMode, _onChangeModalSelection, _selection, _onItemInvoked, _onChangeText } = this;
    return (
      <div>
        <div >
        { /*         
          <ButtonPanel/>
          <Toggle
            label="Enable Compact Mode"
            checked={isCompactMode}
            onChange={_onChangeCompactMode}
            onText="Compact"
            offText="Normal"
            className="DetailList-toggleControl"/>
          <Toggle
            label="Enable Modal Selection"
            checked={isModalSelection}
            onChange={_onChangeModalSelection}
            onText="Modal"
            offText="Normal"
            className="DetailList-toggleControl"
        />*/}
        </div>
        <div>{selectionDetails}</div>
        <TextField label="Filter by name:" onChange={_onChangeText} />
        <MarqueeSelection selection={_selection} >
          <DetailsList
            items={this.props.items}
            compact={isCompactMode}
            // columns={columns}
            selectionMode={this.state.isModalSelection ? SelectionMode.multiple : SelectionMode.none}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={_selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={_onItemInvoked}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </div>
    );
  }

  public componentDidMount(){
    
  }

  public componentDidUpdate(previousProps: IQueryListProps, previousState: IQueryListState) {
    if (previousState.isModalSelection && this.state.isModalSelection){
      if(previousState.isModalSelection !== this.state.isModalSelection) {
        this._selection.setModal(this.state.isModalSelection);
      }
    }
    let previousQuery = previousProps.query || '';
    let currentQuery = this.props.query || '';
    if(previousQuery !== currentQuery){
      // only add the header if it's not metadata
      let headers: Headers = new Headers();
      if(currentQuery.indexOf('EntityDefinitions') < 0){
        headers.append(
          "Prefer", "odata.include-annotations=OData.Community.Display.V1.FormattedValue"
        );
      };
      
      if(this.props.fetchData) {
        this.props.fetchData(window.authContext, currentQuery, headers || null);
      }
    }
  }

  private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean | undefined): void => {
    const isChecked:boolean = checked ? checked : false;
    this.setState({ isCompactMode: isChecked });
  };

  private _onChangeModalSelection = (ev: React.MouseEvent<HTMLElement>, checked: boolean | undefined): void => {
    const isChecked:boolean = checked ? checked : false;
    this.setState({ isModalSelection: isChecked });
  };

  private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string | undefined): void => {
    this.setState({ items: text ? _items.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _items });
  };

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _randomDate(start: Date, end: Date): { value: number; dateFormatted: string } {
    const date: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const dateData = {
      value: date.valueOf(),
      dateFormatted: date.toLocaleDateString()
    };
    return dateData;
  }

  private _randomFileIcon(): { docType: string; url: string } {
    const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
    };
  }

  private _randomFileSize(): { value: string; rawSize: number } {
    const fileSize: number = Math.floor(Math.random() * 100) + 30;
    return {
      value: `${fileSize} KB`,
      rawSize: fileSize
    };
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

  public _getColumns() : IColumn[] {
    const _columns: IColumn[] = [
      // {
      //   key: 'column1',
      //   name: 'File Type',
      //   headerClassName: 'DetailList-header--FileIcon',
      //   className: 'DetailList-cell--FileIcon',
      //   iconClassName: 'DetailList-Header-FileTypeIcon',
      //   ariaLabel: 'Column operations for File type',
      //   iconName: 'Page',
      //   isIconOnly: true,
      //   fieldName: 'name',
      //   minWidth: 16,
      //   maxWidth: 16,
      //   onColumnClick: this._onColumnClick,
      //   onRender: (item: IDocument) => {
      //     return <img src={item.iconName} className={'DetailList-documentIconImage'} />;
      //   }
      // },
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true
      },
      {
        key: 'column2',
        name: 'Address 1 City',
        fieldName: 'address1_city',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'string',
        // onRender: (item: IDocument) => {
        //   return <span>{item.address1_city}</span>;
        // },
        isPadded: true
      },
      // {
      //   key: 'column4',
      //   name: 'Modified By',
      //   fieldName: 'modifiedBy',
      //   minWidth: 70,
      //   maxWidth: 90,
      //   isResizable: true,
      //   isCollapsable: true,
      //   data: 'string',
      //   onColumnClick: this._onColumnClick,
      //   onRender: (item: IDocument) => {
      //     return <span>{item.modifiedBy}</span>;
      //   },
      //   isPadded: true
      // },
      // {
      //   key: 'column5',
      //   name: 'File Size',
      //   fieldName: 'fileSizeRaw',
      //   minWidth: 70,
      //   maxWidth: 90,
      //   isResizable: true,
      //   isCollapsable: true,
      //   data: 'number',
      //   onColumnClick: this._onColumnClick,
      //   onRender: (item: IDocument) => {
      //     return <span>{item.fileSize}</span>;
      //   }
      // }
    ];
    return _columns;
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    let newItems: IDocument[] = items.slice();
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol: IColumn, idx: number) => {
      return column.key === currCol.key;
    })[0];

    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    newItems = this._sortItems(newItems, currColumn.fieldName || '', currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems
    });
  };

  private _sortItems = (items: IDocument[], sortBy: string, descending = false): IDocument[] => {
    if (descending) {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
  };
}
