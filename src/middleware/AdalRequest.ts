import * as request from 'request'
import { RequestAPI, Headers, Options, DefaultUriUrlRequestApi, OptionsWithUri, OptionsWithUrl, OAuthOptions, CoreOptions } from 'request';
import * as AdalNode from 'adal-node';
import { AuthenticationContext, AuthenticationParameters, TokenResponse, AcquireTokenCallback, ErrorResponse, LoggingOptions } from 'adal-node';
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosTransformer } from 'axios';
// import * as adalts from 'adal-typescript'
// import { AuthenticationContext, AdalConfig, Authentication, User } from 'adal-typescript';

/*
// https://login.microsoftonline.com/btsssdev1.onmicrosoft.com/oauth2/authorize?response_type=id_token&client_id=86800445-8f75-4321-a739-5c071410e148&redirect_uri=http%3A%2F%2Flocalhost%3A64098%2Fsimplespa.html&state=a5a36469-9a18-45ae-be22-a0c39550d3d0&x-client-SKU=Js&x-client-Ver=1.0.0&nonce=2885de99-c4c2-4ff9-9970-e68a78e7a885
// https://login.microsoftonline.com/btsssdev1.onmicrosoft.com/oauth2/authorize?response_type=id_token&client_id=86800445-8f75-4321-a739-5c071410e148&redirect_uri=http%3A%2F%2Flocalhost%3A64098%2Fsimplespa.html&state=4f2fa4c3-09af-485d-874b-0f626882e46d&x-client-SKU=Js&x-client-Ver=1.0.0&nonce=8b750f0d-f298-4cc5-a2cf-9a8f9810c267
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
let adalRequest = new AdalRequest(
  CrmConnection.AuthorityUrl,
  CrmConnection.Resource,
  CrmConnection.AppId,
  "",
  CrmConnection.Username,
  CrmConnection.Password,
  CrmConnection.ClientId
)
//adalRequest.getAuth();
// adalRequest.executeRequestAxios('/api/data/v9.0/contacts?$select=fullname,contactid');

*/
export class AdalRequest {
    private tenentDomain: string;
    private authContext: AuthenticationContext;
    private config: any;
    // private tokenResponse: TokenResponse;

    constructor(
        private authorityUrl: string,
        private resource: string,
        private applicationId: string,
        private clientSecret: string,
        private username: string,
        private password: string,
        private clientId: string
    ) {
        this.tenentDomain = username.split("@")[1];
        // var authorityHostUrl = 'https://login.onmicrosoft.com';

        // this.authContext = new AuthenticationContext(authorityUrl, false);
        //this.authContext.options.
        let reqOptions: CoreOptions = {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }
        request.defaults(reqOptions);

    }

    authenticate() {
        //OAuth context
        // this.authContext = new AuthenticationContext(config);

        // // Check For & Handle Redirect From AAD After Login
        // var isCallback = this.authContext.isCallback(window.location.hash);
        // if (isCallback) {
        //     this.authContext.handleWindowCallback();
        // }
        // var loginError = this.authContext.getLoginError();

        // if (isCallback && !loginError) {
        //     window.location = this.authContext._getItem(this.authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
        // }
        // else {
        //     errorMessage.textContent = loginError;
        // }
        // user = this.authContext.getUser();

    }

    //function that logs in the user
    login() {
        // this.authContext.login();
    }
    //function that logs out the user
    logout() {
        // this.authContext.logout();
        // accountsTable.style.display = "none";
        // accountsTableBody.innerHTML = "";
    }

    getToken(resrouce: string, userid: string, clientid: string): void {
        //this.authContext.acquireToken(resrouce, userid, clientid, this.authCallback);
        //this.authContext.getAccessToken(resrouce, userid, clientid, this.authCallback);
    }
    getAuth() {
        const authorityHostUrl: string = 'https://login.onmicrosoft.com';
        const tenant: string = 'btsssdev1.onmicrosoft.com'; // AAD Tenant name.
        const authorityUrl: string = authorityHostUrl + '/' + tenant;
        const applicationId: string = '5c6697df-177e-44df-bea6-37f989736b72'; // Application Id of app registered under AAD.
        const clientSecret: string = 'gQWvR7ArCFcw3/b7VT3xi8sw7XvFAf3IFgBmMG+iQQI='; // Secret generated for app. Read this environment variable.
        const resource: string = '00000002-0000-0000-c000-000000000000'; // URI that identifies the resource for which the token is valid.
        const clientId: string = "2ad88395-b77d-4561-9441-d0e40824f9bc";
        const appId: string = "5c6697df-177e-44df-bea6-37f989736b72";
        const redirectUri: string = 'http://localhost:3000/getAToken';
        /*

        // https://localhost:3000/59711adf-5963-468b-a0c7-a091a94d462a
        // https://BTSSSDEV1.onmicrosoft.com/59711adf-5963-468b-a0c7-a091a94d462a
        //
        // https://login.microsoftonline.com/common/oauth2/authorize?
        // client_id=80ccca67-54bd-44ab-8625-4b79c4dc7775&
        // response_mode=form_post&
        // response_type=code+id_token&
        // scope=openid+profile&
        // state=OpenIdConnect.AuthenticationProperties%3dpxaR9JEn9vuMjAfngd-OEvdLf1MfV665Si1FoE0GvtN-0MD2G8ahnFzyZAKEFOcdFKQ3A1R9FaQfw1WXuYPak1RlbFKZF7fOG1w2N-Kksmd5eREwjMngY-lgTCgew37WbLvCfKKo02CEaGN6kytdZQ&nonce=636758220460678067.ZDU3ZTQ4YjQtMDgzYi00NDJjLTgxMDgtZjBmMjUwY2U2ZTA4MjQ5ZjRlNmQtYTkzMy00YmNmLWI1ZjMtMWIyYjBiZjM1MDQx&
        // redirect_uri=https%3a%2f%2fprotection.office.com%2f
        */
        const templateAuthzUrl = 'https://login.onmicrosoft.com/' +
            tenant +
            '/oauth2/authorize?response_type=code&client_id=' +
            clientId +
            '&redirect_uri=' +
            redirectUri +
            '&state=<state>&resource=' +
            resource;

        const context = new AuthenticationContext(authorityUrl);
        let options: any = context.options;
        let globalOptions = AdalNode.getGlobalADALOptions();

        //setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        context.options.headers = {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        options = context.options;
        context.acquireTokenWithClientCredentials(
            resource,
            applicationId,
            clientSecret,
            (err: any, tokenResponse: any) => {
                if (err) {
                    console.log('well that didn\'t work: ' + err.stack);
                } else {
                    console.log(tokenResponse);
                }
            });
    }

    getAuthUrl() {
        //Set these variables to match your environment
        // var organizationURI = "https://btsssdev1.crm.dynamics.com"; //The URL to connect to CRM (online)
        // var tenant = "btsssdev1.onmicrosoft.com"; //The name of the Azure AD organization you use
        // var clientId = "86800445-8f75-4321-a739-5c071410e148";//"My8puOwUGI3nS8UC0G+z+2B6kY0AXgPwnRKE8ZgmHJU="; //The ClientId you got when you registered the application
        // var pageUrl = "http://localhost:64098/SimpleSPA.html"; //The URL of this page in your development environment when debugging.

        // var user, authContext, message, errorMessage, loginButton, logoutButton, getAccountsButton, accountsTable, accountsTableBody;

        // //Configuration data for AuthenticationContext
        // var endpoints = {
        //     orgUri: organizationURI
        // };

        // window.config = {
        //     tenant: tenant,
        //     clientId: clientId,
        //     postLogoutRedirectUri: pageUrl,
        //     endpoints: endpoints,
        //     cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        // };


        document.onreadystatechange = function () {
            if (document.readyState == "complete") {

                //Set DOM elements referenced by scripts
                // message = document.getElementById("message");
                // errorMessage = document.getElementById("errorMessage");
                // loginButton = document.getElementById("login");
                // logoutButton = document.getElementById("logout");
                // getAccountsButton = document.getElementById("getAccounts");
                // accountsTable = document.getElementById("accountsTable");
                // accountsTableBody = document.getElementById("accountsTableBody");

                // //Event handlers on DOM elements
                // loginButton.addEventListener("click", login);
                // logoutButton.addEventListener("click", logout);
                // getAccountsButton.addEventListener("click", getAccounts);

                // //call authentication function
                // authenticate();

                // if (user) {
                //     loginButton.style.display = "none";
                //     logoutButton.style.display = "block";
                //     getAccountsButton.style.display = "block";

                //     var helloMessage = document.createElement("p");
                //     helloMessage.textContent = "Hello " + user.profile.name;
                //     message.appendChild(helloMessage)

                // }
                // else {
                //     loginButton.style.display = "block";
                //     logoutButton.style.display = "none";
                //     getAccountsButton.style.display = "none";
                // }

            }
        }
    }
        // Function that manages authentication

    // executeRequest(request: string): any {
    //     let responseData: any;

    //     this.authContext.acquireTokenWithUsernamePassword(
    //         this.resource,
    //         this.username,
    //         this.password,
    //         this.applicationId,
    //         (err, resp) => {
    //             let responseType = typeof resp;
    //             if (err) {
    //                 console.log('well that didn\'t work: ' + err.stack);
    //             } else {
    //                 console.log(resp);
    //             }
    //             // execute the request with Adal auth
    //             let tokenResponse : TokenResponse = resp as TokenResponse;
    //             let clientRequest : https.ClientRequest;
    //             // set these values to query your crm data
    //             var crmwebapihost: string = 'btsssdev1.api.crm.dynamics.com';
    //             var crmwebapipath : string = '/api/data/v9.0/contacts?$select=fullname,contactid'; // basic query to select contacts
    //             // var crmwebapipath = '/api/data/v8.2/productpricelevels?$select=amount,_productid_value&$expand=productid($select=name,sms_imageurl,sms_inventory)&$filter=_pricelevelid_value eq F0F7CD14-94EE-E611-8100-C4346BC58654'; //basic query to select contacts
    //             var orgUrl = 'https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/contacts?$select=fullname,contactid';
    //             var headers : https.AgentOptions;

    //             //set the web api request headers
    //              let requestHeaders : https.OutgoingHttpHeaders = {
    //                  'Authorization': 'Bearer ' + tokenResponse.accessToken,
    //                  'OData-MaxVersion': '4.0',
    //                  'OData-Version': '4.0',
    //                  'Accept': 'application/json',
    //                  'Content-Type': 'application/json; charset=utf-8',
    //                  //'Prefer': 'odata.maxpagesize=500',
    //                  'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
    //              };
    //             // //set the crm request parameters
    //              let requestOptions : https.RequestOptions = {
    //                  host: crmwebapihost,
    //                  path: crmwebapipath,
    //                  method: 'GET',
    //                  headers: requestHeaders
    //              };

    //             // crmrequest.setHeader('Prefer', 'odata.include-annotations=OData.Community.Display.V1.FormattedValue');
    //             // crmrequest.setHeader('Authorization', 'Bearer ' + tokenResponse.accessToken);
    //             // crmrequest.setHeader('OData-MaxVersion', '4.0');
    //             // crmrequest.setHeader('Accept', 'application/json');
    //             // crmrequest.setHeader('Content-Type', 'application/json; charset=utf-8');
    //             // crmrequest.setHeader('Prefer', 'odata.maxpagesize=500');
    //             // crmrequest.setHeader('OData-Version', '4.0');
    //             //make the web api request
    //             clientRequest = https.request(requestOptions, function(response: any) {
    //                 var responseparts: any = [];
    //                 response.setEncoding('utf8');
    //                 response.on('data', function(chunk: any) {
    //                     //add each response chunk to the responseparts array for later
    //                     responseparts.push(chunk);
    //                 });
    //                 response.on('end', function() {
    //                     var completeresponse = responseparts.join('');
    //                     var collection = JSON.parse(completeresponse).value;
    //                     console.log('responseData = ' + responseData);
    //                     responseData = collection;
    //                     //resolve(collection);

    //                 });
    //             });
    //             //clientRequest.
    //             clientRequest.on('error', function (e: any) {
    //                 console.error(e);
    //                 //reject(e);
    //             });

    //              //close the web api request
    //              clientRequest.end();
    //         });
    // }

    // authByGet(tenant: string,
    //     clientId: string,
    //     redirectUri: string,
    //     resource: string): string {
    //     let templateAuthzUrl = 'https://login.onmicrosoft.com/{tenant}/oauth2/authorize?response_type=code&client_id={clientId}redirect_uri={redirectUri}state={token}&resource={resource}';
    //     return templateAuthzUrl;
    // }
    executeRequestAxios(request: string): any {
        // let responseData: any;
        // // this.authContext.options.
        // this.authContext.acquireTokenWithUsernamePassword(
        //     this.resource,
        //     this.username,
        //     this.password,
        //     this.applicationId,
        //     (err, resp) => {
        //         let responseType = typeof resp;
        //         if (err) {
        //             console.log('well that didn\'t work: ' + err.stack);
        //         } else {
        //             console.log(resp);
        //         }
        //         // execute the request with Adal auth
        //         let tokenResponse: TokenResponse = resp as TokenResponse;
        //         let clientRequest: AxiosInstance = axios.create(); //https.ClientRequest;

        //         try {
        //             if (tokenResponse == undefined) {
        //                 console.log("tokenResponse is undefined");
        //                 console.log('typeof tokenResponse = ' + typeof tokenResponse);
        //                 return;
        //             }
        //         }
        //         catch (e) {
        //             console.log(e.Message);
        //         }
        //         // set these values to query your crm data
        //         // var crmwebapihost: string = 'btsssdev1.api.crm.dynamics.com';
        //         // var crmwebapipath : string = '/api/data/v9.0/contacts?$select=fullname,contactid'; // basic query to select contacts
        //         // var crmwebapipath = '/api/data/v8.2/productpricelevels?$select=amount,_productid_value&$expand=productid($select=name,sms_imageurl,sms_inventory)&$filter=_pricelevelid_value eq F0F7CD14-94EE-E611-8100-C4346BC58654'; //basic query to select contacts
        //         var orgUrl = 'https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/contacts?$select=fullname,contactid';
        //         //var headers : https.AgentOptions;

        //         let axiosConfig: AxiosRequestConfig = {
        //             url: orgUrl,
        //             method: "get",
        //             headers: {
        //                 'Authorization': 'Bearer ' + tokenResponse.accessToken,
        //                 'OData-MaxVersion': '4.0',
        //                 'OData-Version': '4.0',
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json; charset=utf-8',
        //                 //'Prefer': 'odata.maxpagesize=500',
        //                 'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
        //             }
        //         };

        //         axiosConfig.transformResponse = function (response: any) {
        //             var responseparts: any = [];
        //             response.setEncoding('utf8');
        //             response.on('data', function (chunk: any) {
        //                 //add each response chunk to the responseparts array for later
        //                 responseparts.push(chunk);
        //             });
        //             response.on('end', function () {
        //                 var completeresponse = responseparts.join('');
        //                 var collection = JSON.parse(completeresponse).value;
        //                 console.log('responseData = ' + responseData);
        //                 responseData = collection;
        //                 //resolve(collection);
        //             });
        //         }
        //         //make the web api request
        //         clientRequest.request(axiosConfig);
        //     }
        // );
    }

    authCallback(err: Error, resp: TokenResponse | ErrorResponse): void {
    }

    executeXhr() {
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://btsssdev1.crm.dynamics.com/api/data/v9.0/WhoAmI");
        xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSIsImtpZCI6Imk2bEdrM0ZaenhSY1ViMkMzbkVRN3N5SEpsWSJ9.eyJhdWQiOiJodHRwczovL2J0c3NzZGV2MS5jcm0uZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMmQxYTE2NTgtZTUxOC00OTJmLTkwMmMtNDkwZWI4NDVmYzQ5LyIsImlhdCI6MTU0MDMzMjAwMiwibmJmIjoxNTQwMzMyMDAyLCJleHAiOjE1NDAzMzU5MDIsImFjciI6IjEiLCJhaW8iOiI0MlJnWUpqdzZQVUZuUzJsdmhjdnRRZzE5K3RJRm9oNUo4akx2eFQ4VlBsc3M2dkdzUU1BIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjUxZjgxNDg5LTEyZWUtNGE5ZS1hYWFlLWEyNTkxZjQ1OTg3ZCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUm9iZXJ0cyIsImdpdmVuX25hbWUiOiJKZWZmIiwiaXBhZGRyIjoiNjguMS4xNzkuMjQiLCJuYW1lIjoiSmVmZiBSb2JlcnRzIiwib2lkIjoiOThiM2I1NzgtMWViOC00YmYyLTg3ZTktMjQwMzg0ODE5NjNiIiwicHVpZCI6IjEwMDMzRkZGQTE2RTgyM0YiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJYbEpJNkUtVGJLOXZUY2JkWW9CREkzUkUwVUNieDBTWEh6X3c4ZzdLSjVBIiwidGlkIjoiMmQxYTE2NTgtZTUxOC00OTJmLTkwMmMtNDkwZWI4NDVmYzQ5IiwidW5pcXVlX25hbWUiOiJqZXJvYmVyQEJUU1NTREVWMS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJqZXJvYmVyQEJUU1NTREVWMS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJQeXJ2VVYzOXZVYTFpRTJqYmtMeUFBIiwidmVyIjoiMS4wIn0.E9uNdRETq_enLuVi95QvImZA2LM_KyEbhQ7Mb4E1FxrJG6DBKUm9kwD3L73aE5MZGnwj4ZRov-3z0Hb86xira9VFYi2cvp1CIuTySZKfrIaeJV2IOXwzGdYEugEiFI_JRmzCtyzNWJVMTaOXDmmr5uyIdl6p5769BDIyP8hxLfbqvtul3OjSqcnUgDjoiN9qvzVOKJUCJNonPXAAvUusZT3o-Vo2CKipujr5OVxrLdNz49IaP9sgsdMG4A-CAWEaZLbGiCU4iPe8CcED8tyhB5RKAS8yQmftVeFv-hbsaQfmBTq1sDDs6L7uChLfYKx_67QG_ghVrcPKFC4MWbwDIA");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "d3e3f0aa-d7c9-4c18-acb8-57ea24f00b35");

        xhr.send(data);
    }
}

//import * as https from 'https';
//import https from 'https';

/*
var tenant = 'myTenant.onmicrosoft.com'; // AAD Tenant name.
var authorityUrl = authorityHostUrl + '/' + tenant;
var applicationId = 'yourApplicationIdHere'; // Application Id of app registered under AAD.
var clientSecret = 'yourAADIssuedClientSecretHere'; // Secret generated for app. Read this environment variable.
var resource = '00000002-0000-0000-c000-000000000000'; // URI that identifies the resource for which the token is valid.
*/
