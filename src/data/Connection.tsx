export class Connection {
    public readonly Config: any;

    constructor(
        // public authorityHostUrl: string,
        public tenant: string, // AAD Tenant name.
        // public applicationId: string, // Application Id of app registered under AAD.
        // public clientSecret: string, // Secret generated for app. Read this environment variable.
        public resource: string, // URI that identifies the resource for which the token is valid.
        public clientId: string,
        // public appId: string,
        public redirectUri: string
    ){
        this.Config = {
            tenant: tenant,
            clientId: clientId,
            postLogoutRedirectUri: redirectUri,
            endpoints: {
                orgUri: this.resource
            },
            cacheLocation: "localStorage"
        }
    }

    public getAuthorityUrlTenentWindowsNet(): string{
        return 'https://login.onmicrosoft.com/' + 
            this.tenant + 
            '/oauth2/authorize?response_type=code&client_id=' +
            this.clientId + 
            '&redirect_uri=' + 
            this.redirectUri + 
            '&state=<state>&resource=' + 
            this.resource;
    }

    public getAuthUrlCommonOnMicrosoft(): string{
        // OpenIdConnect.AuthenticationProperties%3dpxaR9JEn9vuMjAfngd-OEvdLf1MfV665Si1FoE0GvtN-0MD2G8ahnFzyZAKEFOcdFKQ3A1R9FaQfw1WXuYPak1RlbFKZF7fOG1w2N-Kksmd5eREwjMngY-lgTCgew37WbLvCfKKo02CEaGN6kytdZQ&nonce=636758220460678067.ZDU3ZTQ4YjQtMDgzYi00NDJjLTgxMDgtZjBmMjUwY2U2ZTA4MjQ5ZjRlNmQtYTkzMy00YmNmLWI1ZjMtMWIyYjBiZjM1MDQx
        return 'https://login.microsoftonline.com/common/oauth2/authorize?' +
            'client_id=' + this.clientId + '&' +
            'response_mode=form_post&' +
            'response_type=code+id_token&' +
            'scope=openid+profile&' +
            'redirect_uri=' + this.redirectUri;
    }
}

/*
let CrmConnection = {
  "AuthType":"OAuth",
  "AuthorityUrl" : "https://login.microsoftonline.com/",
  "Username":"jerober@btsssdev1.onmicrosoft.com",
  "Password": "Corp123!",
  "ResourceUrl":"https://btsssdev1.crm.dynamics.com",
  "Resource":"btsssdev1.crm.dynamics.com", // btsssdev1.api.crm.dynamics.com/api/data/v9.0
  "ApiUrl":"https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/",
  "AppId": "5c6697df-177e-44df-bea6-37f989736b72", //"e95f1b23-abaf-45ee-821d-b7ab251ab3bf",
  "ObjectId" : "192b660e-d679-412d-a8f0-aa878070fc4d",
  "ClientId":"2ad88395-b77d-4561-9441-d0e40824f9bc",
  "RedirectUri":"http://localhost:3000",
  "EndPoints": {
    "DynamicsWebClient":"https://btsssdev1.crm.dynamics.com",
    "DynamicsApi" : "https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/",
    "DomainLoginUrl" : "https://login.microsoftonline.com",
    "CurrentAppUrl":"http://localhost:3000",
  }
}
*/