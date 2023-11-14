import { IColumn } from '@fluentui/react/lib/DetailsList';

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

export interface IDetailListDocumentState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
}