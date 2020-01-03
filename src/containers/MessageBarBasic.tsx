import { connect } from 'react-redux';
import * as actions from '../actions/MessageBarBasic';
import MessageBarBasic from '../components/messagebar/MessageBarBasic';
import { MessageBarBasicStoreState } from '../model/MessageBarBasic';
import { Dispatch } from 'redux';

// MapStateToPropsFactory<any, any, {}>
// MapStateToPropsParam<any, any, {}>

const initialState: MessageBarBasicStoreState = {
    messageIndex: 0, // this.props.messageIndex,
    messageText: '', // this.props.messageText,
    showMessage: false, // this.props.showMessage
};

const mapStateToProps = (state: MessageBarBasicStoreState = initialState) => ({
    messageIndes: state.messageIndex,
    messageText: state.messageText,
    showMessage: state.showMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.MessageBarActionType>) => {
    return {
        onClearMessage: (messageIndex: number) => dispatch(actions.clearMessageText(messageIndex)),
        onShowMessage: (messageIndex: number) => dispatch(actions.showMessageText(messageIndex)),
        onAddMessage: (messageText: string) => dispatch(actions.addMessageText(messageText)),
    };
};
// <any, any, any>
export default connect(mapStateToProps, mapDispatchToProps)(MessageBarBasic);
