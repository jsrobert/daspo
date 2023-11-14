import * as React from 'react'
import { MessageBar,
    MessageBarType,
    IMessageBar,
    IMessageBarProps,
    IMessageBarState,
    IMessageBarStyleProps,
    IMessageBarStyles } from '@fluentui/react/lib/MessageBar';
    import { AddMessage, ShowMessage, ClearMessage, ADD_MESSAGE } from '../../actions/MessageBarBasic'

export interface Props extends IMessageBarProps {
    messageIndex?: number;
    messageText?: string;
    showMessage?: boolean;
    onAddMessage: (messageText: string) => AddMessage;
    onShowMessage?: () => ShowMessage;
    onClearMessage?: () => ClearMessage;
}
export class MessageBarBasic extends React.Component<Props, any> {

    private initialState: IMessageBarState = {
        showContent: false
    }

    constructor(
        public props: Props) {
        super(props)
        this.setState({
            messageBarState: this.initialState
        });
        this.props.onClick = () => { alert('heywood ya'); }
    }

    public onDismiss(){
        // this.messageBar.
    }

    public render(): JSX.Element {
        const context: IMessageBarState = this.state;
        let message: string = "this sucks"
        return (
            <div className="show-errors">
                <MessageBar
                    hidden={false}
                    messageBarType={MessageBarType.error}
                    isMultiline={false}
                    key={context.labelId}
                    onDismiss={() => this.onDismiss()}>
                    {message}
                </MessageBar>
            </div>
        );
    }
}
