import * as React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { LeftNav } from 'components/nav/LeftNav';

export class PanelSmallLeftExample extends React.Component<
  {},
  {
    showPanel: boolean;
  }
> {
  constructor(props: IPanelProps) {
    super(props);
    this.state = { showPanel: false };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          secondaryText="Opens the Sample Panel"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => this.setState({ showPanel: true })}
          text="Open Left Panel"

        />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedNear}
          // tslint:disable-next-line:jsx-no-lambda
          onDismiss={() => this.setState({ showPanel: false })}
          headerText="Panel - Small, left-aligned, fixed"
          onRenderFooterContent={this._onRenderFooterContent}
        >
          <LeftNav/>
        </Panel>
      </div>
    );
  }

  private _onRenderFooterContent = (): JSX.Element => {
    return (
      <div>
        <PrimaryButton onClick={() => this.setState({ showPanel: false })} style={{ marginRight: '8px' }}>Save</PrimaryButton>
        <DefaultButton onClick={() => this.setState({ showPanel: false })}>Cancel</DefaultButton>
      </div>
    );
  };
}
