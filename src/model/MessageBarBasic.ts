import { AddMessage, ShowMessage, ClearMessage } from '../actions/MessageBarBasic'
import { IMessageBarProps } from 'office-ui-fabric-react/lib/MessageBar';

// export default interface MessageBarMessage {
//     messageIndex?: number;
//     messageText?: string;
//     showMessage?: boolean| undefined;
//     messageType?: string | undefined;
// };

export interface MessageBarStoreState {
    messageIndex?: number | undefined;
    messageText?: string | undefined;
    showMessage?: boolean| undefined;
};

export interface MessageBarProps extends IMessageBarProps {
    messageIndex: number;
    messageText: string;
    showMessage: boolean;
    onAddMessage: (messageText: string) => AddMessage;
    onShowMessage?: () => ShowMessage;
    onClearMessage: () => ClearMessage;
};
export type MessageBarMessage = {
    messageIndex: number | undefined;
    messageText: string | undefined;
    showMessage: boolean| undefined;
}

export type MessageBarBasicStoreState = {
    messageIndex: number | undefined;
    messageText: string | undefined;
    showMessage: boolean| undefined;
}
