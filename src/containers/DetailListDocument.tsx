import { withRouter } from 'react-router-dom';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, IDetailsListProps, IDetailsListState } from 'office-ui-fabric-react/lib/DetailsList';
import { DetailListDocument } from '../components/entities/DetailListDocument';
import * as actions from '../actions/DetailListDocument';
import { IDetailListDocumentState, IQueryListState, IQueryListProps } from '../model/DetailsList';
import { connect, connectAdvanced, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { any } from 'prop-types';

const initialState: IQueryListState = {
  items: new Array(),
  columns: new Array<IColumn>(),
  focusedItemIndex: 0,
  adjustedColumns: new Array<IColumn>(),
  query: "",
  inProgress: false,
  data: {},
  error: {},
  version: '1.0.0',
}

export const mapStateToProps = (state: any) => {
  return {
    data: state.queryList.data,
    items: state.queryList.items,
    inProgress: state.queryList.inProgress,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.DetailListActionType>) => {
  return {
    fetchData: (token: any, query: string, headers: any) => dispatch(actions.LoadData(token, query, headers)),
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DetailListDocument);


