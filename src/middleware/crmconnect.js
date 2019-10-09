import * as https from 'https';
import { AuthenticationContext } from 'react-adal';
//import * as adal from 'adal-node';

export class CrmConnect {
    constructor(
        Url, 
        Username,
        Password,
        ClientId
    ){
        this.Url = Url;
        this.Username = Username;
        this.Password = Password;
        this.ClientId = ClientId;

    }
    executeRequest(){
        //let _self = this;
        //var token = _self.getToken()
        //let a = new adal();
        /******************************************************* 
         * https://login.microsoftonline.com/2d1a1658-e518-492f-902c-490eb845fc49/ wsfed?            wa=wsignin1.0&  wtrealm=https%3a%2f%2fbtsssdev1.crm.dynamics.com%2f&  wctx=pr%3dwsfederation%26rm%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f%26ru%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f%26ry%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f%26crmorgid%3d68b0195d-8cfa-4502-ab62-b7762d8a7e11%26nonce%3dCRMWSFed.nonce.636753157935978589.YzY1ZjJiOTktMmJmNi00OThlLThhMTMtMzM0Y2NjNDY3NGI0Nzc4ZTNlYzgtOTBjYS00MjQ3LWE3ODgtMGZlMzkzYTdkMzQ2&wct=2018-10-16T19%3a43%3a13Z&  wreply=https%3a%2f%2fcloudredirector.crm.dynamics.com%3a443%2fG%2fAuthRedirect%2fIndex.aspx%3f  RedirectTo%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f
         * https://login.microsoftonline.com/2d1a1658-e518-492f-902c-490eb845fc49/ wsfed?            wa=wsignin1.0&  wtrealm=https%3a%2f%2fbtsssdev1.crm.dynamics.com%2f&  wctx=pr%3dwsfederation%26rm%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f%26ru%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f%26ry%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f%26crmorgid%3d68b0195d-8cfa-4502-ab62-b7762d8a7e11%26nonce%3dCRMWSFed.nonce.636753156654698956.NTM2Y2E1NjYtNTMxOS00Nzk2LTgwMGUtZTlkZWVlNDg3MmUzMjliNjU2ZTgtNjFlZC00NmY2LTk3MzQtNzVjOWE0ZDNhNThm&wct=2018-10-16T19%3a41%3a05Z&  wreply=https%3a%2f%2fcloudredirector.crm.dynamics.com%3a443%2fG%2fAuthRedirect%2fIndex.aspx%3f  RedirectTo%3dhttps%253a%252f%252fbtsssdev1.crm.dynamics.com%252f
         * https://btsssdev1.crm.dynamics.com/                                     oauth2/authorize? response_type=id_token&  client_id=2ad88395-b77d-4561-9441-d0e40824f9bc&  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&  state=cc9c5739-0827-4673-9c9f-f1242c3113c9&client-request-id=7a87960a-fb50-416c-ae0c-4396259ba45e&  x-client-SKU=Js&x-client-Ver=1.0.17&  nonce=68544e72-652a-4419-9c88-0265464c2ec6
         * 
        */
       let adalConfig = {
            tenant: 'btsssdev1.onmicrosoft.com', //this.Url,
            clientId: this.ClientId,
            redirectUri: "app://5d3e90d6-aa8e-48a8-8f2c-58b45cc67315",
            navigateToLoginRequestUrl: false
        }
        let authContext = new AuthenticationContext(adalConfig);
        /*
        authContext.acquireToken(this.Url, (result)=>{
            console.log(result);
        });
        /**
        * Matches nonce from the request with the response.
        * @ignore
        AuthenticationContext.prototype._matchNonce = function (user) {
            var requestNonce = this._getItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN);

            if (requestNonce) {
                requestNonce = requestNonce.split(this.CONSTANTS.CACHE_DELIMETER);
                for (var i = 0; i < requestNonce.length; i++) {
                    if (requestNonce[i] === user.profile.nonce) {
                        return true;
                    }
                }
            }

            return false;
        };
        */
        authContext.login();
        let loginError = authContext.getLoginError() || null; 
        //return this.getData(token);
        //authContext.isCallback
        console.log("login error = " + loginError);
    }
    getToken() {
        authContext.login();
        let loginError = authContext.getLoginError() || null; 
        console.log("Login error: " + loginError);

        return new Promise((resolve, reject) => {
            let CrmConnection = {
                "AuthType":"OAuth",
                "Username":"jerober@btsssdev1.onmicrosoft.com",
                "Domain" : "btsssdev1.onmicrosoft.com",
                "Url":"https://btsssdev1.crm.dynamics.com",
                "ApiUrl":"https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/",
                "AppId":"e95f1b23-abaf-45ee-821d-b7ab251ab3bf",
                "ClientId":"2ad88395-b77d-4561-9441-d0e40824f9bc",
                "RedirectUri":"app://5d3e90d6-aa8e-48a8-8f2c-58b45cc67315", 
                "Password": "Corp123!"
            }

            //set these values to retrieve the oauth token
            //var crmorg = 'https://yourcrminstance.region.dynamics.com';
            //var clientid = 'When you register your app in Azure AD, you get this';
            //var username = 'crmuser@domain.com';
            //var userpassword = 'yourpassword';
            //                   https://login.microsoftonline.com/2d1a1658-e518-492f-902c-490eb845fc49/login
            //var tokenendpoint = 'https://login.microsoftonline.com/' + CrmConnection.AppId + '/oauth2/token';
            var tokenendpoint = 'https://login.microsoftonline.com/' + CrmConnection.Domain + '/oauth2/token';
            //remove https from tokenendpoint url
            tokenendpoint = tokenendpoint.toLowerCase().replace('https://', '');

            //get the authorization endpoint host name
            var authhost = tokenendpoint.split('/')[0];

            //get the authorization endpoint path
            var authpath = '/' + tokenendpoint.split('/').slice(1).join('/');

            //build the authorization request
            //if you want to learn more about how tokens work, see IETF RFC 6749 - https://tools.ietf.org/html/rfc6749
            var reqstring = 'client_id=' + CrmConnection.ClientId;
            reqstring += '&resource=' + encodeURIComponent(CrmConnection.Url);
            reqstring += '&username=' + encodeURIComponent(CrmConnection.Username);
            reqstring += '&password=' + encodeURIComponent(CrmConnection.Password);
            reqstring += '&grant_type=password';

            //set the token request parameters
            let tokenrequestoptions = {
                host: authhost,
                path: authpath,
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(reqstring)
                }
            };

            //make the token request
            var tokenrequest = https.request(tokenrequestoptions, function (response) {
                //make an array to hold the response parts if we get multiple parts
                var responseparts = [];
                response.setEncoding('utf8');
                //response.headers["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"]
                response.on('data', function (chunk) {
                    //add each response chunk to the responseparts array for later
                    responseparts.push(chunk);
                });
                response.on('end', function () {
                    //once we have all the response parts, concatenate the parts into a single string
                    var completeresponse = responseparts.join('');
                    console.log('Response: ' + completeresponse);
                    console.log('Token response retrieved . . . ');

                    //parse the response JSON
                    var tokenresponse = JSON.parse(completeresponse);

                    //extract the token
                    var token = tokenresponse.access_token;

                    //pass the token to our data retrieval function
                    getData(token);
                    //resolve(token);
                });
            });
            tokenrequest.on('error', function (e) {
                console.error(e);
                reject(e);
            });

            //post the token request data
            tokenrequest.write(reqstring);

            //close the token request
            tokenrequest.end();

            function getData(token) {
                return new Promise((resolve, reject) => {
                    //set these values to query your crm data
                    var crmwebapihost = 'btsssdev1.api.crm.dynamics.com';
                    var crmwebapipath = '/api/data/v9.0/contacts?$select=fullname,contactid'; //basic query to select contacts
                    //var crmwebapipath = '/api/data/v8.2/productpricelevels?$select=amount,_productid_value&$expand=productid($select=name,sms_imageurl,sms_inventory)&$filter=_pricelevelid_value eq F0F7CD14-94EE-E611-8100-C4346BC58654'; //basic query to select contacts
                    //var orgUrl = 'https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/contacts?$select=fullname,contactid';
                    //set the web api request headers
                     var requestheaders = {
                         'Authorization': 'Bearer ' + token,
                         'OData-MaxVersion': '4.0',
                         'OData-Version': '4.0',
                         'Accept': 'application/json',
                         'Content-Type': 'application/json; charset=utf-8',
                         //'Prefer': 'odata.maxpagesize=500',
                         'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
                     };
        
                    // //set the crm request parameters
                     var crmrequestoptions = {
                         host: crmwebapihost,
                         path: crmwebapipath,
                         method: 'GET',
                         headers: requestheaders
                     };
        
                    //make the web api request
                     var crmrequest = https.request(crmrequestoptions, function(response) {
                         var responseparts = [];
                         response.setEncoding('utf8');
                         response.on('data', function(chunk) {
                             //add each response chunk to the responseparts array for later
                             responseparts.push(chunk);
                         });
                         response.on('end', function() {
                             var completeresponse = responseparts.join('');
                             var collection = JSON.parse(completeresponse).value;
                             resolve(collection);
                         });
                     });
        
                     crmrequest.on('error', function (e) { 
                        console.error(e);
                        reject(e);
                     }); 
        
                     //close the web api request
                     crmrequest.end();
                });
            }
        });
    }
    /**
     * @function getData
     * @description Generic helper function to handle basic XMLHttpRequest calls.
     * @returns {Promise} - A Promise that returns either the request object or an error object.
     */
    getData(token) {
        return new Promise((resolve, reject) => {
            //set these values to query your crm data
            var crmwebapihost = 'btsssdev1.api.crm.dynamics.com';
            var crmwebapipath = '/api/data/v9.0/contacts?$select=fullname,contactid'; //basic query to select contacts
            //var crmwebapipath = '/api/data/v8.2/productpricelevels?$select=amount,_productid_value&$expand=productid($select=name,sms_imageurl,sms_inventory)&$filter=_pricelevelid_value eq F0F7CD14-94EE-E611-8100-C4346BC58654'; //basic query to select contacts
            //var orgUrl = 'https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/contacts?$select=fullname,contactid';
            //set the web api request headers
             var requestheaders = {
                 'Authorization': 'Bearer ' + token,
                 'OData-MaxVersion': '4.0',
                 'OData-Version': '4.0',
                 'Accept': 'application/json',
                 'Content-Type': 'application/json; charset=utf-8',
                 //'Prefer': 'odata.maxpagesize=500',
                 'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
             };

            //set the crm request parameters
             var crmrequestoptions = {
                 host: crmwebapihost,
                 path: crmwebapipath,
                 method: 'GET',
                 headers: requestheaders
             };

            //make the web api request
             var crmrequest = https.request(crmrequestoptions, function(response) {
                 var responseparts = [];
                 response.setEncoding('utf8');
                 response.on('data', function(chunk) {
                     //add each response chunk to the responseparts array for later
                     responseparts.push(chunk);
                 });
                 response.on('end', function() {
                     var completeresponse = responseparts.join('');
                     var collection = JSON.parse(completeresponse).value;
                     resolve(collection);
                 });
             });

             crmrequest.on('error', function (e) { 
                console.error(e);
                reject(e);
             }); 

             //close the web api request
             crmrequest.end();
        });
    }

    // Create the XHR object.
    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        // } else if (typeof XDomainRequest != "undefined") {
        //     // XDomainRequest for IE.
        //     xhr = new XDomainRequest();
        //     xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
  }
  
  // Helper method to parse the title tag from the response.
  getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
  }
  
  // Make the actual CORS request.
  makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';
  
    var xhr = this.createCORSRequest('GET', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
  
    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      var title = this.getTitle(text);
      console.log('Response from CORS request to ' + url + ': ' + title);
    };
  
    xhr.onerror = function() {
        console.log('Woops, there was an error making the request.');
    };
  
    xhr.send();
  }
}