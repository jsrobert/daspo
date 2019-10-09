import * as React from 'react'
// import {  }  from 'redux'
import { logger } from 'redux-logger'
import {Button, ButtonType, DefaultButton, ActionButton} from 'office-ui-fabric-react/lib/Button'
import {Dialog, DialogType, DialogFooter} from 'office-ui-fabric-react/lib/Dialog'
import { MessageBar,
    MessageBarType,
    IMessageBar,
    IMessageBarProps,
    IMessageBarState,
    IMessageBarStyleProps,
    IMessageBarStyles } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { AddMessage, ShowMessage, ClearMessage, ADD_MESSAGE, CLEAR_MESSAGE, MessageBarActionType } from '../../actions/MessageBarBasic'
import { MessageBarMessage, MessageBarBasicStoreState } from '../../model/MessageBarBasic'

interface MessageBarBasicProps {
    messageIndex?: number | null;
    messageText?: string | null;
    showMessage?: boolean | null;
    onAddMessage?: (messageText: string) => void;
    onShowMessage?: (messageIndex: number) => void;
    onClearMessage?: (messageIndex: number) => void;
}

const defaultProps: MessageBarBasicProps = {
    messageIndex: 77, // this.props.messageIndex,
    messageText: 'default', // this.props.messageText,
    showMessage: false, // this.props.showMessage
    // onAddMessage: () => {},
    // onClearMessage: () => {},
    // onShowMessage: () => {},
}

export default class MessageBarBasic extends React.Component<MessageBarBasicProps,MessageBarBasicStoreState>  {
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
        this.AddMessageHandler.bind(this);
        this.OnChange.bind(this);
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

    private messageCounter: number = 0;
    public AddMessageHandler = (ev: any) => {
        let newMessageText = ' onAddMessage ' + this.messageCounter++ + ' newText counter value';
        if(this.props.onAddMessage){
            this.props.onAddMessage(newMessageText);
        }
        this.setState({
            messageText: newMessageText
        });
    }

    public onClear = (ev: any) => {
        if(this.props.onClearMessage){
            this.props.onClearMessage(8);
        }
        this.setState({
            messageText: '',
            showMessage: false,
        })
    }
    public OnChange = (ev: any, newText: string) => {
        // if(this.props.onAddMessage){
        //     this.props.onAddMessage('newText');
        //     alert('props.onAddMessage is NOT null');
        // }
        // else {
        //     alert('props.onAddMessage is null');
        // }
    }

    public render(): JSX.Element {
        const { AddMessageHandler, onDismiss, OnChange, onClear } = this;
        // const { onClearMessage } = this.props;
        const { onAddMessage } = this.props;
        const { messageIndex, messageText, showMessage }: MessageBarMessage = this.state;
        return (
            <div className="show-errors">
                <TextField onChange={OnChange} label="Message Text" ariaLabel="Message Text" errorMessage="Error message here." />
                <ActionButton buttonType={ButtonType.hero} onClick={onClear}>Clear</ActionButton>
                <ActionButton buttonType={ButtonType.hero} onClick={AddMessageHandler}>Add Handler</ActionButton>
                <ActionButton buttonType={ButtonType.hero} onClick={(e) => OnChange(e,'message here')}>Add Action</ActionButton>
                <MessageBar
                    hidden={showMessage}
                    messageBarType={MessageBarType.info}
                    isMultiline={true}
                    onDismiss={onDismiss}>
                    {messageText}
                </MessageBar>
            </div>
        );
    }
}
