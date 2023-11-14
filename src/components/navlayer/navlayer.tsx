import { Customizer } from '@uifabric/utilities';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { LayerHost } from '@fluentui/react/lib/Layer';
import { Panel } from '@fluentui/react/lib/Panel';
import * as React from 'react';

export interface ILayerCustomizedExampleState {
  showPanel: boolean;
  trapPanel: boolean;
}

export class LayerCustomizedExample extends React.Component<{}, ILayerCustomizedExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showPanel: false,
      trapPanel: false,
    };
  }

  public render(): JSX.Element {
    const {showPanel, trapPanel} = this.state;
    return (
      <div>
        <p>
          A <code>Panel</code> is rendered, trapped in a specified container. Use 'Show panel' to show/hide the panel
          (or click the X to dismiss it). Use 'Trap panel' to release the panel from its bounds.
        </p>
        <Checkbox label="Show panel" checked={showPanel} onChange={this.onShowPanelChange} />
        <Checkbox label="Trap panel" checked={trapPanel} onChange={this.onTrapPanelChange} />
        <Customizer
          scopedSettings={
            this.state.trapPanel
              ? {
                  Layer: {
                    hostId: 'panelLayerHost',
                  },
                }
              : {}
          }
        >
          {this.state.showPanel ? (
            <Panel
              isOpen={true}
              hasCloseButton={true}
              headerText="Test"
              focusTrapZoneProps={{
                isClickableOutsideFocusTrap: true,
                forceFocusInsideTrap: false,
              }}
              onDismissed={this.onDismissPanel}
            />
          ) : (
            <div />
          )}
        </Customizer>
        <LayerHost
          id="panelLayerHost"
          style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            border: '1px solid #ccc',
          }}
        />
      </div>
    );
  }

  private onDismissPanel = (): void => {
    this.setState({
      showPanel: false,
    });
  }

  private onShowPanelChange = (event: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined): void => {
    this.setState({
      showPanel: !!checked,
    });
  }

  private onTrapPanelChange = (event: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined): void => {
    this.setState({
      trapPanel: !!checked,
    });
  }
}
