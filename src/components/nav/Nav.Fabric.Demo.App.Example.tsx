import * as React from 'react';
import { Nav, INavProps, INavLinkGroup, INavLink } from 'office-ui-fabric-react/lib/Nav';

const AppDefinition = {
  appTitle: 'Fabric - React',
  examplePages: [
    {
      links: [
        {
          key: 'ActivityItem',
          name: 'ActivityItem',
          url: '#/examples/activityitem',
        },
        {
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb',
        },
        {
          key: 'Button',
          name: 'Button',
          url: '#/examples/button',
        },
      ],
      name: 'Basic components',
    },
    {
      links: [
        {
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker',
        },
        {
          key: 'ExtendedPeoplePicker',
          name: 'ExtendedPeoplePicker',
          url: '#examples/extendedpeoplepicker',
        },
        {
          key: 'GroupedList',
          name: 'GroupedList',
          url: '#examples/groupedlist',
        },
      ],
      name: 'Extended components',
    },
    {
      links: [
        {
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#examples/focustrapzone',
        },
        {
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#examples/focuszone',
        },
        {
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          url: '#examples/marqueeselection',
        },
      ],
      name: 'Utilities',
    },
  ],
};

const navlink: INavLink = {
  name: 'Link One',
  url: 'http://localhost:3000/',
};

const links: INavLink[] = [{
  name: 'Link One',
  url: 'http://localhost:3000/',
}];

const group: INavLinkGroup = {
  name: 'Group One',
  links: [],
};

const groups: INavLinkGroup[] = [{
  links: [],
}];

const props: INavProps = {
  groups: [],
};

export class NavFabricDemoAppExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return <Nav groups={AppDefinition.examplePages} onRenderLink={this.onRenderLink} expandButtonAriaLabel={'Expand or collapse'} />;
  }

  private onRenderLink = (navlinkprops: any): JSX.Element | null => {
    return (
      <span>
        <span key={1} className="Nav-linkText">
          {navlinkprops.name}
        </span>
      </span>
    );
  }
}
