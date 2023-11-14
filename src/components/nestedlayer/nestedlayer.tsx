import { DefaultButton } from '@fluentui/react/lib/Button';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import * as React from 'react';

export interface ILayerNestedLayersExampleState {
  hideDialog: boolean;
  showPanel: boolean;
}

export class LayerNestedLayersExample extends React.Component<{}, ILayerNestedLayersExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      hideDialog: true,
      showPanel: false,
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this.onShowPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this.onClosePanel}
          headerText="This panel makes use of Layer and FocusTrapZone. Focus should be trapped in the panel."
          closeButtonAriaLabel="Close" >
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this.showDialog} text="Open Dialog" />
          <Dialog
            hidden={this.state.hideDialog}
            onDismiss={this.closeDialog}
            isBlocking={true}
            dialogContentProps={{
              type: DialogType.normal,
              title:
                'This dialog uses Modal, which also makes use of Layer and FocusTrapZone. Focus should be trapped in the dialog.',
              subText: "Focus will move back to the panel if you press 'OK' or 'Cancel'.",
            }}
            modalProps={{
              titleAriaId: 'myLabelId',
              subtitleAriaId: 'mySubTextId',
              isBlocking: false,
              containerClassName: 'ms-dialogMainOverride',
            }}
          >
            {null /** You can also include null values as the result of conditionals */}
            <DialogFooter>
              <PrimaryButton onClick={this.closeDialog} text="OK" />
              <DefaultButton onClick={this.closeDialog} text="Cancel" />
            </DialogFooter>
          </Dialog>
        </Panel>
      </div>
    );
  }

  private closeDialog = (): void => {
    this.setState({
      hideDialog: true,
    });
  }

  private showDialog = (): void => {
    this.setState({
      hideDialog: false,
    });
  }

  private onShowPanel = (): void => {
    this.setState({
      showPanel: true,
    });
  }

  private onClosePanel = (): void => {
    this.setState({
      showPanel: false,
    });
  }

}
