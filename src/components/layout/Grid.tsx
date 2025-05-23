import * as React from 'react';

export class GridLayout extends React.Component<{},{showNav: boolean;}> {
  constructor(props: {}) {
    super(props);
    this.state = { showNav: false };
  }

  public render(): JSX.Element {
    return (
        <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">A</div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">B</div>
            </div>
        </div>
    )
  }
}