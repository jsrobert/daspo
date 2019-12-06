import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';
import { MessageBarBasicStoreState, MessageBarMessage } from '../../model/MessageBarBasic';

interface IMessageBarBasicProps {
    messageIndex?: number | null;
    messageText?: string | null;
    showMessage?: boolean | null;
}

const defaultProps: IMessageBarBasicProps = {
    messageIndex: 77, // this.props.messageIndex,
    messageText: 'default', // this.props.messageText,
    showMessage: false, // this.props.showMessage
    // onAddMessage: () => {},
    // onClearMessage: () => {},
    // onShowMessage: () => {},
};

export default class MessageBarBasic extends React.Component<IMessageBarBasicProps, MessageBarBasicStoreState>  {
    public readonly state: MessageBarBasicStoreState;
    private readonly initialState: MessageBarBasicStoreState = {
            messageIndex: 0, // this.props.messageIndex,
            messageText: '', // this.props.messageText,
            showMessage: false, // this.props.showMessage
    };

    constructor(
        public props: IMessageBarBasicProps = defaultProps) {
        super(props);

        this.state = this.initialState;
        this.onDismiss.bind(this);
    }

    public onDismiss = () => {
        // this.messageBar.
        this.setState({ showMessage: false });
    }

    public render(): JSX.Element {
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
