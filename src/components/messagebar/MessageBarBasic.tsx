import * as React from 'react'
// import {  }  from 'redux'
import { logger } from 'redux-logger'

import {Dialog, DialogType, DialogFooter} from 'office-ui-fabric-react/lib/Dialog'
import { MessageBar,
    MessageBarType,
    IMessageBar,
    IMessageBarProps,
    IMessageBarState,
    IMessageBarStyleProps,
    IMessageBarStyles } from 'office-ui-fabric-react/lib/MessageBar';

import { AddMessage, ShowMessage, ClearMessage, ADD_MESSAGE, CLEAR_MESSAGE, MessageBarActionType } from '../../actions/MessageBarBasic'
import { MessageBarMessage, MessageBarBasicStoreState } from '../../model/MessageBarBasic'

interface MessageBarBasicProps {
    messageIndex?: number | null;
    messageText?: string | null;
    showMessage?: boolean | null;

}

const defaultProps: MessageBarBasicProps = {
    messageIndex: 77, // this.props.messageIndex,
    messageText: 'default', // this.props.messageText,
    showMessage: false, // this.props.showMessage
    // onAddMessage: () => {},
    // onClearMessage: () => {},
    // onShowMessage: () => {},
}

export default class MessageBarBasic extends React.Component<MessageBarBasicProps, MessageBarBasicStoreState>  {
    readonly initialState: MessageBarBasicStoreState = {
            messageIndex: 0, // this.props.messageIndex,
            messageText: '', // this.props.messageText,
            showMessage: false, // this.props.showMessage
    };

    constructor(
        public props: MessageBarBasicProps = defaultProps) {
        super(props)

        this.state = this.initialState;
        this.onDismiss.bind(this);
    }

    readonly state: MessageBarBasicStoreState;

    componentWillReceiveProps(inProps: MessageBarBasicProps) {
        let incomingProps = [{
            messageIndex: inProps.messageIndex,
            messageText: inProps.messageText,
            showMessagge: inProps.showMessage,
        }];
    }

    componentWillUpdate(nextProps: MessageBarBasicProps) {
        let _messageText: string = nextProps.messageText || '';
        let _showMessage: boolean = nextProps.showMessage || false;
    }

    public onDismiss = (event: any) => {
        // this.messageBar.
        this.setState({ showMessage: false }) 
    }

    public render(): JSX.Element {
        const { onDismiss } = this;
        // const { onClearMessage } = this.props;
        const { messageIndex, messageText, showMessage }: MessageBarMessage = this.state;
        return (
                <MessageBar
                    hidden={this.state.showMessage}
                    messageBarType={MessageBarType.info}
                    isMultiline={true}
                    onDismiss={() => this.setState({ showMessage: false })}>
                    {this.state.messageText}
                </MessageBar>
        );
    }
}
