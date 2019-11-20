import { Dispatch, AnyAction } from 'redux';
import { AuthenticationContext, TokenResponse } from 'adal-node';
import { string } from 'prop-types';

export interface IApiCallProps {
    InProgressFunc: (status: boolean) => AnyAction,
    successFunc: (data: any) => AnyAction,
    failureFunc: (error: any) => AnyAction,
}

export interface IHeaderEntry {
    name: string;
    value: string;
}

export interface IHeaderEntries {
    entries: IHeaderEntry[];
}

export class ApiCall<T extends IApiCallProps> {

    constructor(private props: T){
        if(this.props.InProgressFunc && this.props.successFunc && this.props.failureFunc)
            this.isInitialized = true;
        else
            this.isInitialized = false;
    }

    public isInitialized: boolean;

    private initHeaders = (headers: any, token: string) => {
        return {
            ...headers,
            Authorization : "Bearer " + token,
        }
    };

    private baseHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0"
    }

    private baseHeadersWithFormattedValues = {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        "Prefer": "odata.include-annotations=OData.Community.Display.V1.FormattedValue"
    }

    public FetchData = (authContext: any, query: string, additionalHeaders: any) => {
        let organizationURI = authContext.config.endpoints.orgUri;
        let queryUrl = organizationURI + query;
        // Function to perform operation is passed as a parameter to the aquireToken method
        return (dispatch: Dispatch, getState: any) => {
            authContext.acquireToken(
                organizationURI,
                (error: any, token: any) => {
                    if(error || !token){
                        dispatch(this.props.failureFunc(error));
                        console.error("FetchData authContext.acquireToken error: " + error)
                    }
                    else {
                        dispatch(this.props.InProgressFunc(true));

                        let reqHeaders = additionalHeaders ?
                            this.initHeaders(
                                this.baseHeadersWithFormattedValues, 
                                token
                            ) :
                            this.initHeaders(
                                this.baseHeaders,
                                token
                            );
                        
                        const reqInit: RequestInit = {
                            method: "GET",
                            mode: "cors",
                            cache: "no-cache",
                            credentials: "same-origin",
                            headers: reqHeaders,
                            redirect: "follow",
                            referrer: "no-referrer",
                        };

                        fetch(queryUrl, reqInit)
                            .then((response) => {
                                if (!response.ok) {
                                    throw Error(response.statusText);
                                }
                                dispatch(this.props.InProgressFunc(false));
                                return response;
                            })
                            .then((response) => response.json())
                            .then((data) => dispatch(this.props.successFunc(data.value)))
                            .catch(() => dispatch(this.props.failureFunc(true)));
                    }
                }
            );
        }
    }

    public FetchMetaData = (authContext: any, query: string) => {
        const _top = window.top;
        let organizationURI = authContext.config.endpoints.orgUri;

        let queryUrl = organizationURI + query;
        // Function to perform operation is passed as a parameter to the aquireToken method
        return (dispatch: Dispatch, getState: any) => {
            authContext.acquireToken(
                organizationURI,
                (error: any, token: any) => {
                    if(error || !token){
                        dispatch(this.props.failureFunc(error));
                        console.log("FetchData authContext.acquireToken error: " + error)
                    }
                    else {
                        dispatch(this.props.InProgressFunc(true));

                        //console.log("Bearer token = " + token);
                        const reqInit: RequestInit = {
                            method: "GET",
                            mode: "cors",
                            cache: "no-cache",
                            credentials: "same-origin",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "Authorization": "Bearer " + token,
                                "Accept": "application/json",
                                "OData-MaxVersion": "4.0",
                                "OData-Version": "4.0"
                            },
                            redirect: "follow",
                            referrer: "no-referrer",
                        };
                    
                        fetch(queryUrl, reqInit)
                            .then((response) => {
                                if (!response.ok) {
                                    throw Error(response.statusText);
                                }
                                dispatch(this.props.InProgressFunc(false));
                                return response;
                            })
                            .then((response) => response.json())
                            .then((data) => dispatch(this.props.successFunc(data.value)))
                            .catch(() => dispatch(this.props.failureFunc(true)));
                    }
                }
            );
        }
    }
}

    // private authContextCallApi = (renderCallBack: any) => {
    //     const _top = window.top;
    //     let organizationURI = window.authContext.config.endpoints.orgUri;
    //     console.log("authContextCallApi => Retrieving 10 accounts from ${organizationURI} /api/data/v9.1/accounts")
    //     // Function to perform operation is passed as a parameter to the aquireToken method
    //     window.authContext.acquireToken(
    //         organizationURI,
    //         renderCallBack
    //     );
    //     console.log("authContextCallApi end.");
    // }

    // private authContextCallback = (error: any, token: any) => {
    //     let errorMessage = document.getElementById('errorMessage') || document.createElement('input');
    //     const organizationURI = window.authContext.config.endpoints.orgUri;
    //     // const view: string = this.state.appView ? this.state.appView.replace('\\', '') : "contacts";

    //     // Handle ADAL Errors.
    //     if (error || !token) {
    //         //errorMessage.textContent = 'ADAL error occurred: ' + error;
    //         console.log('ADAL error occurred: ' + error);
    //         return;
    //     }
    //     console.log("Bearer token = " + token);
    //     const reqInit: RequestInit = {
    //         method: "GET",
    //         mode: "cors",
    //         cache: "no-cache",
    //         credentials: "same-origin",
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //             "Authorization": "Bearer " + token,
    //             "Accept": "application/json",
    //             "OData-MaxVersion": "4.0",
    //             "OData-Version": "4.0"
    //         },
    //         redirect: "follow",
    //         referrer: "no-referrer",
    //     };
    //     const url = encodeURI(organizationURI + "/api/data/v9.1/" + view + "?$select=name,address1_city&$top=10");
    //     fetch(url, reqInit)
    //     .then(
    //         response => response.json()
    //     )
    //     .then(
    //         data => { 
    //             // console.log("fetch then " + JSON.stringify(data));
    //             //this.responseData = data;
    //             console.log("responseData then " + JSON.stringify(data));
    //             window.setDaspoData(data);
    //             // this.setState({
    //             //     appData: data.value,
    //             // })
    //         }
    //     )
    //     .catch(
    //         error => console.error("fetch error " + error)
    //     );
    //     console.log("authContextCallback end.");
    // }

// GET request for the /list_user page.
// get('/listUsers', function (req, res) {
//    console.log("Got a GET request for list of users");

//      // Create a relative path URL
//     let reqPath = path.join(__dirname, '../mock/users.json');

//     //Read JSON from relative path of this file
//     fs.readFile(reqPath , 'utf8', function (err, data) {
//         //Handle Error
//        if(!err) {
//          //Handle Success
//           console.log("Success"+data);
//          // Parse Data to JSON OR
//           var jsonObj = JSON.parse(data)
//          //Send back as Response
//           res.end( data );
//         }else {
//            //Handle Error
//            res.end("Error: "+err )
//         }
//    });
// })