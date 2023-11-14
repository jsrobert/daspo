import { CommandBar, ICommandBarProps, ICommandBarItemProps, ICommandBarData } from '@fluentui/react/lib/CommandBar';
import { AnyAction } from 'redux';

export type CommandBarProps = CommandBarValueProps & CommandBarActionProps;

export interface CommandBarValueProps extends ICommandBarProps {
    cbItems?: ICommandBarItemProps[];
    cbTitle?: string;
    items: Array<ICommandBarItemProps>;
    isAuthenticated: boolean;
}

export interface CommandBarActionProps {
    onHideButton?: () => AnyAction;
    onShowButton?: () => AnyAction;
    checkAuth?: () => AnyAction;
    loginClick?: () => AnyAction;
}
export interface CommandBarState {
    isAuthenticated: boolean;
    canDownload: boolean;
    hideButton: boolean;
}