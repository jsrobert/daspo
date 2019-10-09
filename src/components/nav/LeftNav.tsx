import * as React from 'react';
import { Nav, INavLink, INavProps, INavState, INav, INavLinkGroup, INavStyles, INavStyleProps } from 'office-ui-fabric-react/lib/Nav';
import { Link }  from 'office-ui-fabric-react/lib/Link';
import './Nav.Basic.Example.scss';

const link: INavLink = {
  name: 'Link One',
  url: 'http://localhost:3000/'
}

const links: INavLink[] = [{
  name: 'Link One',
  url: 'http://localhost:3000/'
}];

const group: INavLinkGroup = {
  name: 'Group One',
  links: [],
}

const groups: INavLinkGroup[] = [{
  name: 'Group One',
  links: [],
}]

const props: INavProps = {
  groups: [],
}

export class LeftNav extends React.Component<any, INavState> {
  constructor(public props:any){
    super(props)
    this.onLinkClick.bind(this);
    this.getSelectedKey.bind(this);
    let selectedKey = this.getSelectedKey();
    this.state = {
      selectedKey: selectedKey,
    }
  }

  public readonly state: INavState = {
    selectedKey: 'homeLink',
  }

  private getSelectedKey = () => {
    let path = window.location.pathname;
    //alert('location path = ' + path);
    return path;
  }
  public onLinkClick = (ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (item && item.name === 'News') {
      // React. item.url
      ev.preventDefault();
    }
    if(item){
      this.setState({
        selectedKey: item.key,
      })
    }
  };

  // private accountLink: NavLink 

  public render(): JSX.Element {
    const { onLinkClick } = this;
    return (
      <div className="ms-NavExample-LeftPane">
        <Nav
          groups={[
            {
              links: [
                {
                  name: 'Home',
                  url: 'http://localhost:3000',
                  key: '/', // 'homeLink',
                },
                { name: 'Solutions', url: 'http://localhost:3000/Solutions', key: '/Solutions', isExpanded: true },
                { name: 'Entities',  url: 'http://localhost:3000/Entities',  key: '/Entities',  isExpanded: true,
                    links: [
                        {
                          name: 'Accounts',
                          url: 'http://localhost:3000/Accounts',
                          key: '/Accounts'
                        },
                        {
                          name: 'Contacts',
                          url: 'http://localhost:3000/Contacts',
                          key: '/Contacts',
                        }
                    ]
                },
                {
                  name: 'News',
                  url: 'http://cnn.com',
                  icon: 'News',
                  key: '/News'
                }
              ]
            }
          ]}
          onLinkClick={onLinkClick}
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
          selectedKey={this.state.selectedKey}
          expandButtonAriaLabel={'Expand or collapse'}
        />
      </div>
    );
  }
}