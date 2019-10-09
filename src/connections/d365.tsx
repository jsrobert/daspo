
export default class D36Api{
    public CrmConnection: any;

    constructor(
        orguUrl: string, 
        username: string, 
        password: string, 
        apiUrl: string, 
        authType: string, 
        appId: string, 
        clientId: string, 
        redirectUrl: string ) {
            
        this.CrmConnection = {
            "AuthType":authType,
            "Username":username,
            "Url": orguUrl,
            "ApiUrl":apiUrl, //"https://btsssdev1.api.crm.dynamics.com/api/data/v9.0/",
            "AppId":appId,
            "ClientId":clientId,
            "RedirectUri":redirectUrl, 
            "Password": password
        }
    }
}