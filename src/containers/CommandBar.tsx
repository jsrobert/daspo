import { connect } from 'react-redux';
import * as actions from '../actions/CommandBar';
import CommandBarBasic from '../components/commandbar/CommandBarBasic';
import { CommandBarState, CommandBarActionProps, CommandBarValueProps } from '../model/CommandBar';
import { Dispatch } from 'redux';

const initialState: CommandBarState = {
    canDownload: false,
    isAuthenticated: false,
    hideButton: false,
};

export const mapStateToProps = (state: any) => {
    return {
        hideButton: state.commandBar.hideButton,
        isAuthenticated: state.commandBar.isAuthenticated,
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<actions.CommandBarActionType>) => {
    return {
        onHideButton: () => dispatch(actions.hideButton()),
        onShowButton: () => dispatch(actions.showButton()),
        checkAuth: () => dispatch(actions.checkAuth()),
        loginClick: () => dispatch(actions.loginClick()),
        logoutClick: () => dispatch(actions.logoutClick()),
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CommandBarBasic);
