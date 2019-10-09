import { withRouter } from 'react-router-dom'
import { DetailListDocument } from '../components/entities/DetailListDocument';
import * as actions from '../actions/DetailListDocument';
import { IDetailListDocumentState } from '../model/DetailsListState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({ columns, isCompactMode, isModalSelection, items, selectionDetails }: IDetailListDocumentState) {
  return {
    columns,
    isCompactMode,
    isModalSelection,
    items,
    selectionDetails
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.DetailListActionType>) {
  return {
    onLoadData: (query: string) => dispatch(actions.LoadData(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailListDocument);

