export default class D365Request { 
    execute() {
        return new Promise((resolve, reject) => {
            var https = require('https');

            var CrmConnection = {
                "AuthType":"OAuth",
                "Username":"jjerober@btsssdev1.onmicrosoft.com.",
                "Url":"https://btsssdev1.crm.dynamics.com",
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
            var tokenendpoint = 'https://login.microsoftonline.com/' + CrmConnection.AppId + '/oauth2/token';

            //set these values to query your crm data
            var crmwebapihost = 'btsssdev1.api.dynamics.com';
            var crmwebapipath = '/api/data/v8.2/contacts?$select=fullname,contactid'; //basic query to select contacts
            //var crmwebapipath = '/api/data/v8.2/productpricelevels?$select=amount,_productid_value&$expand=productid($select=name,sms_imageurl,sms_inventory)&$filter=_pricelevelid_value eq F0F7CD14-94EE-E611-8100-C4346BC58654'; //basic query to select contacts

            //remove https from tokenendpoint url
            tokenendpoint = tokenendpoint.toLowerCase().replace('https://', '');

            //get the authorization endpoint host name
            var authhost = tokenendpoint.split('/')[0];

            //get the authorization endpoint path
            var authpath = '/' + tokenendpoint.split('/').slice(1).join('/');

            //build the authorization request
            //if you want to learn more about how tokens work, see IETF RFC 6749 - https://tools.ietf.org/html/rfc6749
            var reqstring = 'client_id=' + CrmConnection.ClientId; //clientid;
            reqstring += '&resource=' + encodeURIComponent(CrmConnection.Url); //encodeURIComponent(crmorg);
            reqstring += '&username=' + encodeURIComponent(CrmConnection.Username); // encodeURIComponent(username);
            reqstring += '&password=' + encodeURIComponent(CrmConnection.Password); //encodeURIComponent(userpassword);
            reqstring += '&grant_type=password';


            //set the token request parameters
            var tokenrequestoptions = {
                host: authhost,
                path: authpath,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(reqstring)
                }
            };

            //make the token request
            var tokenrequest = https.request(tokenrequestoptions, function (response) {
                //make an array to hold the response parts if we get multiple parts
                var responseparts = [];
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    //add each response chunk to the responseparts array for later
                    responseparts.push(chunk);
                });
                response.on('end', function () {
                    //once we have all the response parts, concatenate the parts into a single string
                    var completeresponse = responseparts.join('');
                    //console.log('Response: ' + completeresponse);
                    console.log('Token response retrieved . . . ');

                    //parse the response JSON
                    var tokenresponse = JSON.parse(completeresponse);

                    //extract the token
                    var token = tokenresponse.access_token;

                    //pass the token to our data retrieval function
                    getData(token);
                });
            });
            tokenrequest.on('error', function (e) {
                console.error(e);
            });

            //post the token request data
            tokenrequest.write(reqstring);

            //close the token request
            tokenrequest.end();

            function getData(token) {
                //set the web api request headers
                var requestheaders = {
                    'Authorization': 'Bearer ' + token,
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Prefer': 'odata.maxpagesize=500',
                    //'Prefer': 'odata.include-annotations=OData.Community.Display.V1.FormattedValue'
                };

                //set the crm request parameters
                var crmrequestoptions = {
                    host: crmwebapihost,
                    path: crmwebapipath,
                    method: 'GET',
                    headers: requestheaders
                };

                //make the web api request
                var crmrequest = https.request(crmrequestoptions, function (response) {
                    //make an array to hold the response parts if we get multiple parts
                    var responseparts = [];
                    response.setEncoding('utf8');
                    response.on('data', function (chunk) {
                        //add each response chunk to the responseparts array for later
                        responseparts.push(chunk);
                    });
                    response.on('end', function () {
                        //once we have all the response parts, concatenate the parts into a single string
                        var completeresponse = responseparts.join('');

                        //parse the response JSON
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
            }
        });
    }
}

