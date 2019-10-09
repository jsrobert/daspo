import { withRouter } from 'react-router-dom'
import DetailsListBasic from '../components/list/DetailsListBasic';
import * as actions from '../actions/Enthusiasm';
import HelloStoreState from '../model/Hello';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: HelloStoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsListBasic);
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsListBasic));
