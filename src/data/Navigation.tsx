import * as React from 'react';
import { Nav, INavLink, INavProps, INavState, INav, INavLinkGroup, INavStyles, INavStyleProps } from '@fluentui/react/lib/Nav';
import { Link } from '@fluentui/react/lib/Link';
import { IconNames } from '../constants/IconNames';
import * as NavData from './Navigation.json';

// const NavData: any = require('./Navigation.json');

export class Navigation {

    public static OneDriveGroup: INavLinkGroup = {
        name: "OneDrive",
        expandAriaLabel: "Expand",
        collapseAriaLabel: "Collapse",
        collapseByDefault: true,
        links: [
            {
                name: 'Documents',
                url: './Documents',
                key: '/Documents',
                icon: IconNames.DocLibrary,
                isExpanded: true,
                automationId: "onedrive-documents-nav",
            },
        ],
    };
    public static SharePointGroup: INavLinkGroup = {
        name: "SharePoint",
        expandAriaLabel: "Expand",
        collapseAriaLabel: "Collapse",
        collapseByDefault: true,
        links: [
            {
                name: 'Documents',
                url: './Documents',
                key: '/Documents',
                icon: IconNames.DocLibrary,
                isExpanded: true,
                automationId: "sharepoint-documents-nav",
            },
        ],
    };

    public static AzureGroup: INavLinkGroup = {
        name: "Azure",
        expandAriaLabel: "Expand",
        collapseAriaLabel: "Collapse",
        collapseByDefault: true,
        links: [
            {
                name: 'Blob Storage',
                url: '/Blob',
                key: '/Blob',
                icon: IconNames.BlowingSnow, // 'Tiles'
            },
            {
                name: 'File Storage',
                url: '/File',
                key: '/File',
                icon: IconNames.FileTemplate,
                isExpanded: true,
            },
        ],
    };

    public static DynamicsGroup: INavLinkGroup = {
        name: "Dynamics 365",
        expandAriaLabel: "Expand",
        collapseAriaLabel: "Collapse",
        collapseByDefault: true,
        links: [
            {
                name: 'Home',
                url: '/api/discovery/v9.1/Instances',
                key: '/Home', // 'homeLink',
                icon: IconNames.Home,
                automationId: "dynamics-home-nav",
            },
            {
                name: 'Solutions',
                url: 'http://localhost:3000/Solutions',
                key: '/Solutions',
                icon: IconNames.FileTypeSolution,
                isExpanded: false,
                automationId: "dynamics-solutions-nav",
            },
            {
                name: 'Entities',
                // url: '/api/data/v9.1/entitydefinitions?$top=10',
                url: "/api/data/v9.1/EntityDefinitions?$select=*",
                key: '/Entities',
                isExpanded: false,
                links: [
                    {
                        name: 'Accounts',
                        // url: "/api/data/v9.1/accounts?$select=name,address1_city&$top=10",
                        url: "/api/data/v9.1/accounts?$top=10",
                        key: '/Accounts',
                        icon: IconNames.Accounts,
                    },
                    {
                        name: 'Contacts',
                        // url: '/api/data/v9.1/contacts?$select=name,address1_city&$top=10',
                        url: '/api/data/v9.1/contacts?$top=10',
                        key: '/Contacts',
                        icon: IconNames.Contact,
                    },
                    {
                        name: "Attachments",
                        url: "/api/data/v9.1/attachments",
                        key: "/Attachments",
                        icon: IconNames.Attach,
                    },
                ],
            },
            {
                name: "Metadata",
                url: "/api/data/v9.1/$metadata",
                key: "/MetaData",
                isExpanded: false,
                icon: IconNames.ProcessMetaTask,
            },
            {
                name: 'Business Processes',
                url: 'http://localhost:3000/BusinessProcesses',
                icon: IconNames.Processing,
                key: '/BusinessProcesses',
            },
            {
                name: "Relationship Metadata",
                url: "/api/data/v9.1/RelationshipDefinitions?$select=*",
                icon: IconNames.ConnectContacts,
                key: "/RelationshipDefinitions",
            },
            {
                name: "Global Option Sets",
                url: '/api/data/v9.1/GlobalOptionSetDefinitions?$select=*',
                icon: IconNames.BulletedList,
                key: '/GlobalOptionSetDefinitions',
            },
            {
                name: 'Navigation Settings',
                url: '/api/data/v9.1/navigationsettings?$select=*&$orderby=advancedsettingorder asc',
                icon: IconNames.GlobalNavButton,
                key: '/NavigationSettings',
            },
            {
                name: 'App Modules',
                // url: '/api/data/v9.1/$metadata#appmodules(*)',
                url: "/api/data/v9.1/appmodules?$select=name,appmoduleversion&$orderby=name asc", // $filter=_appmoduleid_value eq " + selectedAppId;
                icon: IconNames.PowerApps,
                key: '/AppModules',
            },
            {
                name: "App Configs",
                url: "/api/data/v9.1/appconfigs?$select=*",
                icon: IconNames.AllAppsMirrored,
                key: "/AppConfigs",
            },
        ],
    };

    public static defaultGroups: INavLinkGroup[] = [
        Navigation.DynamicsGroup,
        Navigation.AzureGroup,
        Navigation.SharePointGroup,
        Navigation.OneDriveGroup,
    ];

    public static defaultProps: INavProps = {
        groups: Navigation.defaultGroups,
    };

    public static getDefaultGroups = (): INavLinkGroup[] => {
        return Navigation.defaultGroups;
    }

    public static getDefaultProps = (): INavProps => {
        return Navigation.defaultProps;
    }

    private static load = () => {
        const page0 = NavData.pages[0];
    }
}
