import { IColumn, IDetailsListState, IDetailsListProps } from '@fluentui/react/lib/DetailsList';

export interface IDetailListDocumentState extends IDetailsListState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  focusedItemIndex: number;
  adjustedColumns: [],
}

export interface IDocument {
  [key: string]: any;
  name: string;
  value: string;
  iconName: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
}

export interface IAccount {
  [key: string]: any;
  name: string;
  value: string;
  iconName: string;
  address1_city: string;
}

export interface IDetailListDocumentState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
}

export interface IQueryListState extends IDetailsListState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails?: string;
  isModalSelection?: boolean;
  isCompactMode?: boolean;
  query: any,
  inProgress: boolean,
  data: any,
  error: any,
}

export interface IQueryListProps extends IDetailsListProps {
  columns?: IColumn[];
  selectionDetails?: string;
  isModalSelection?: boolean;
  isCompactMode?: boolean;
  focusedItemIndex?: number;
  adjustedColumns?: IColumn[],
  query?: any,
  data?: any,
  error?: any,
  fetchData?: (token: any, query: string, headers: any) => void;
}
