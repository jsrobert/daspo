import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Grid, GridCell, IGridProps} from '@fluentui/react/lib/Grid';
import {Button, ButtonType, DefaultButton, ActionButton} from '@fluentui/react/lib/Button';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { MessageBarActionType, AddMessage } from '../../actions/MessageBarBasic';
import { isElementVisible } from '@uifabric/utilities';
import {CommandBarProps, CommandBarState} from '../../model/CommandBar';
import { SSL_OP_NO_TLSv1_1 } from 'constants';
import '../../common/TextField.example.scss'

const fs = require('fs')

export interface ButtonPanelProps {
    onAddMessage?: (messageText: string) => void;
    onShowMessage?: (messageIndex: number) => void;
    onClearMessage?: (messageIndex: number) => void;
}

export default class ButtonPanel extends React.Component<ButtonPanelProps, {}> {
    constructor(
        public props: ButtonPanelProps){
            super(props);
            this.OnChange.bind(this);
            this.onClear.bind(this);
        }

        private messageCounter: number = 0;

        public onClear = (ev: any) => {
            if(this.props.onClearMessage){
                this.props.onClearMessage(8);
            }
            this.setState({
                messageText: '',
                showMessage: false,
            })
        }
        public OnChange = (ev: any, newText: string | undefined) => {
            // if(this.props.onAddMessage){
            //     this.props.onAddMessage('newText');
            //     alert('props.onAddMessage is NOT null');
            // }
            // else {
            //     alert('props.onAddMessage is null');
            // }
        }
        public OnRenderItem = (item: any, index: number) => {

        }
        
        public AddMessageHandler = (ev: any) => {
            let newMessageText = ' onAddMessage ' + this.messageCounter++ + ' newText counter value';
            if(this.props.onAddMessage){
                this.props.onAddMessage(newMessageText);
            }
            this.setState({
                messageText: newMessageText
            });
        }

        public render(): JSX.Element {
            const { AddMessageHandler, OnChange, onClear, OnRenderItem } = this;
            return (
                <div className="ms-FocusZone ms-DetailsRow is-selected">
                    <TextField onChange={OnChange}  label="Message Text" ariaLabel="Message Text" errorMessage="Error message here." />
                    <DefaultButton onClick={onClear}>Clear</DefaultButton>
                    <DefaultButton onClick={AddMessageHandler}>Add Handler</DefaultButton>
                    <DefaultButton onClick={(e) => OnChange(e,'message here')}>Add Action</DefaultButton>
                </div>
            )
        }
    }