import * as React from 'react';
import { INavLink, INavProps, INavState, INav, INavLinkGroup, INavStyles, INavStyleProps } from 'office-ui-fabric-react/lib/Nav';
import { Link }  from 'office-ui-fabric-react/lib/Link';
import { IconNames } from '../constants/IconNames';
export class Navigation {

    public static SharePointGroup: INavLinkGroup = {
        name: "SharePoint", 
        links: [
            { 
                name: 'Documents',
                url: 'http://localhost:3000/Documents',
                key: '/Documents',
                icon: IconNames.DocLibrary,
                isExpanded: true,
                automationId: "sharepoint-documents-nav", 
            }
        ]
    };
    
    public static AzureGroup: INavLinkGroup = {
        name: "Azure", 
        links: [
            { 
                name: 'Blob Storage',
                url: 'http://localhost:3000/Blob',
                key: '/Blob',
                icon: IconNames.BlowingSnow //'Tiles' 
            }, 
            { 
                name: 'File Storage',
                url: 'http://localhost:3000/File',
                key: '/File',
                icon: IconNames.FileTemplate,
                isExpanded: true 
            }
        ]
    };
    
    public static DynamicsGroup: INavLinkGroup = {
        name: "Dynamics 365",
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
                isExpanded: true,
                automationId: "dynamics-solutions-nav", 
            },
            { 
                name: 'Entities',
                // url: '/api/data/v9.1/entitydefinitions?$top=10',
                url: "/api/data/v9.1/EntityDefinitions?$select=*",
                key: '/Entities',
                isExpanded: true,
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
                    }
                ]
            },
            {
                name: "Metadata", 
                url: "/api/data/v9.1/$metadata", 
                key:"/MetaData", 
                isExpanded: false,
                icon: IconNames.ProcessMetaTask
            },
            {
                name: 'Business Processes',
                url: 'http://localhost:3000/BusinessProcesses',
                icon: IconNames.Processing,
                key: '/BusinessProcesses'
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
                key: '/AppModules'
            },
            {
                name: "App Configs",
                url: "/api/data/v9.1/appconfigs?$select=*",
                icon: IconNames.AllAppsMirrored,
                key: "/AppConfigs",
            }
        ]
    };

    public static defaultGroups: Array<INavLinkGroup> = [
        Navigation.DynamicsGroup,
        Navigation.AzureGroup,
        Navigation.SharePointGroup,
    ];

    public static defaultProps: INavProps = {
        groups: Navigation.defaultGroups
    }

    public static getDefaultGroups = (): Array<INavLinkGroup> => {
        return Navigation.defaultGroups;
    }

    public static getDefaultProps = (): INavProps => {
        return Navigation.defaultProps;
    }
}