import { INavProps, INavState, Nav } from '@fluentui/react/lib/Nav';
import * as React from 'react';
import './Nav.Basic.Example.scss';

export class LeftNav extends React.Component<INavProps, INavState> {
  constructor(public props: INavProps) {
    super(props);
    // this.onLinkClick.bind(this);
    this.getSelectedKey.bind(this);

    this.state = {
      selectedKey: this.props.selectedKey,
      isGroupCollapsed: { one: true },
    };
  }

  public render(): JSX.Element {
    // const { onLinkClick, defaultProps, defaultGroups } = this;
    // const { groups }: Array<INavLinkGroup>  = [ ...this.props, ...defaultGroups];
    // const { name, age }: Person = params || {}
    // const { localLinkClick } = this;
    const { groups, onLinkClick } = this.props;
    // const defaultGroups = defaultProps.groups || new Array<INavLinkGroup>();
    // const combinedGroups: Array<INavLinkGroup> = instanceof groups === Array ? groups.concat(defaultGroups) : defaultGroups; // defaultGroups ; //
    return (
      <div className="ms-NavExample-LeftPane">
        <Nav
          groups={groups}
          onLinkClick={onLinkClick}
          // expandedStateText={'expanded'}
          // collapsedStateText={'collapsed'}
          selectedKey={this.props.selectedKey}
          expandButtonAriaLabel={'Expand or collapse'}
        />
      </div>
    );
  }

  // public readonly state: INavState = {
  //   selectedKey: 'homeLink',
  // }

  private getSelectedKey = () => {
    const path = window.location.pathname;
    // alert('location path = ' + path);
    return path;
  }

  // public onLinkClick = (ev: React.MouseEvent<HTMLElement> | undefined, item?: INavLink | undefined) => {
  //   if (item && item.name === 'News') {
  //     // React. item.url
  //     ev ? ev.preventDefault() : null;
  //   }
  //   if(item){
  //     this.setState({
  //       selectedKey: item.key,
  //     })
  //   }
  // };

  // public localLinkClick = (ev: React.MouseEvent<HTMLElement> | undefined, item?: INavLink | undefined) => {
  //   console.log('local link click');
  //   if(this.props.onLinkClick){
  //     console.warn('this.props.onLinkClick being called');
  //     this.props.onLinkClick(ev, item);
  //   }
  //   else {
  //     console.error('this.props.onLinkClick NOT called');
  //   }
  // }
}
