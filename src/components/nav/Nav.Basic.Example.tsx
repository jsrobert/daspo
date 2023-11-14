import * as React from 'react';
import { Nav, INavProps, INavLink, INavLinkGroup } from '@fluentui/react/lib/Nav';
import './Nav.Basic.Example.scss';

export class NavBasicExample extends React.Component<any, any> {
  private linkgroups: INavLinkGroup[];

  constructor(
    private NavProps: INavProps) {
    super(NavProps);
    this.linkgroups =  [{
      links: [
        {
          name: 'Home',
          url: 'http://example.com',
          links: [
            {
              name: 'Activity',
              url: 'http://msn.com',
              key: 'key1',
            },
            {
              name: 'News',
              url: 'http://msn.com',
              key: 'key2',
            },
          ],
          isExpanded: true,
        },
        { name: 'Documents', url: 'http://example.com', key: 'key3', isExpanded: true },
        { name: 'Pages', url: 'http://msn.com', key: 'key4' },
        { name: 'Notebook', url: 'http://msn.com', key: 'key5' },
        { name: 'Long Name Test for ellipse', url: 'http://msn.com', key: 'key6' },
        {
          name: 'Edit',
          url: 'http://cnn.com',
          icon: 'Edit',
          key: 'key8',
        },
        {
          name: 'Delete',
          url: 'http://cnn.com',
          iconProps: { iconName: 'Delete' },
          key: 'key9',
        },
      ],
    }];
    this._onClickHandler = this._onClickHandler.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="ms-NavExample-LeftPane">
        <Nav groups={this.linkgroups}
          // expandedStateText={'expanded'}
          // collapsedStateText={'collapsed'}
          selectedKey={'key3'}
        />
      </div>
    );
  }

  private _onClickHandlerG(e: React.MouseEvent<HTMLElement>): false {
    return false;
  }

  private _onClickHandler(e: React.MouseEvent<HTMLElement>): false {
    alert('test');
    return false;
  }

  private _onClickHandler2(e: React.MouseEvent<HTMLElement>): false {
    return false;
  }
}
