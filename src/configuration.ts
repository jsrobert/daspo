/**
 * Service for retrieving duct cases from duct db.
 * @property urlBase - The base URL used to connect to the DUCT API endpoints.
 * @property icmUrlBase - The base URL used to connect to IcM API endpoints.
 * @property tenant - The tenant is the domain name of the AAD tenant used to sign users in.
 * @property clientId - The Client ID is used by the application to uniquely identify itself to Azure AD.
 * @property redirectUri - The redirect URL used in authentication.
 * @property incidentUri - The incident details URL used.
 * @property proactiveCommunicationUri - The proactive communication details URL used.
 * @property newDuctCaseUri - the new duct case URL used.
 * @property engageConfirmUri - the new duct case engage confirmation URL used.
 * @property postLogoutRedirectUri - The post logout URL used.
 * @property successPanelStyle - The ending of the panel style name for a success panel, i.e. panel-'successPanelStyle'.
 * @property warningPanelStyle - The ending of the panel style name for a warning panel, i.e. panel-'successPanelStyle'.
 * @property dangerPanelStyle - The ending of the panel style name for a danger panel, i.e. panel-'successPanelStyle'.
 * @property noNextUpdateTimeIndicated - The string to use if a date is not provided for the next update time.
 * @property countdownPanelHeaderText - The text to be shown when a communication time is pending.
 * @property countdownPanelHeaderExpired - The header text to be shown when a communication time is expired.
 * @property countdownPanelUpdateTimeMissed - The table text to be shown when a communication time has been missed.
 * @property updateTimeThresholdDanger - The threshold that the next communication time is set to danger stylings.
 * @property updateTimeThresholdWarning - The threshold that the next communication time is set to warning stylings.
 * @property nextUpdateTimePoll - The duration between polls of next communication time.
 * @property defaultLoopIntervalInMilliseconds - The default duration between loops in a LoopedTask if none is provided.
 * @property updateActiveDuctCaseInMilliseconds - The duration between polls of active DUCT cases.
 * @property updatePendingIncidentsInMilliseconds - The duration between polls of pending incidents.
 * @property updateRenewTokenInMilliseconds - The duration between polls of renewing adal tokens.
 * @property formatStringDateTime - The format string for displaying DateTime as text.
 * @property formatStringCountdownDateTime - The format string for displaying DateTime as text in the countdown component.
 * @property formatStringPreviousUpdatesDateTime - The format string for displaying DateTime as text in the previous communication updates table.
 * @property updateClockIntervalInMilliseconds - The amount of time between updating the clock in the navigation bar.
 * @property OSPSHDLink - The beginning of the OSP deeplink for SHD.
 * @property DOCAODLink - The link for DOC AOD.
 * @property CRMAODLink - The link for CRM AOD.
 * @property CMFTEAODWeekdayLink - The link for CM FTE AOD on Weekdays.
 * @property CMFTEAODWeekendLink - The link for CM FTE AOD on Weekends.
 * @property FeedbackLink - The link for feedback.
 * @property serverMinDate - The DateTime.MinValue passed by server.
 * @property initialCommDue - The duration between engagement time and initial communication due.
 * @property disableAuth - Disables the authorization.
 * @property skipAuthentication - Determines if hostname is equal to localhost.
 * @property defaultNoAuthUserName - User name value when authorization is disabled.
 * @property defaultNoAuthEmailAddress - Email address value when authorization is disabled.
 * @property defaultLanguageCode - Default lauguage locale.
 */
export class Configuration {
    /**
     * The singleton, globally accessible instance of Configuration.
    */
    public static global: Configuration = new Configuration();

    public urlBase: string;

    public icmUrlBase: string;

    public tenant: string;

    public clientId: string;

    public redirectUri: string;

    public incidentUri: string;

    public proactiveCommunicationUri: string;

    public newDuctCaseUri: string;

    public engageConfirmUri: string;

    public postLogoutRedirectUri: string | undefined;

    public successPanelStyle: string;

    public warningPanelStyle: string;

    public dangerPanelStyle: string;

    public noNextUpdateTimeIndicated: string;

    public countdownPanelHeaderText: string;

    public countdownPanelHeaderExpired: string;

    public countdownPanelUpdateTimeMissed: string;

    public updateTimeThresholdDanger: number;

    public updateTimeThresholdWarning: number;

    public nextUpdateTimePoll: number;

    public defaultLoopIntervalInMilliseconds: number;

    public updateActiveDuctCaseInMilliseconds: number;

    public updatePendingIncidentsInMilliseconds: number;

    public updateRenewTokenInMilliseconds: number;

    public formatStringDateTime: string;

    public formatStringCountdownDateTime: string;

    public formatStringPreviousUpdatesDateTime: string;

    public updateClockIntervalInMilliseconds: number;

    public OSPSHDLink: string;

    public DOCAODLink: string;

    public CRMAODLink: string;

    public CMFTEAODWeekdayLink: string;

    public CMFTEAODWeekendLink: string;

    public FeedbackLink: string;

    public WhiteboardLink: string;

    public serverMinDate: Date;

    public initialCommDue: number;

    public disableAuth: boolean;

    public skipAuthentication: boolean;

    public defaultNoAuthUserName: string;

    public defaultNoAuthEmailAddress: string;

    public defaultLanguageCode: number;

    /**
     * @constructor
     */
    constructor() {
        if (location.hostname === "localhost") {
            this.urlBase = "http://localhost:30465/api/";
            this.newDuctCaseUri = "http://localhost:30466/Engage/New";
            this.engageConfirmUri = "http://localhost:30466/Engage/Confirm/";
            this.icmUrlBase = "https://icm.ad.msoppe.msft.net/imp/IncidentDetails.aspx?id=";
            this.tenant = "microsoft.onmicrosoft.com";
            this.clientId = "ca39d59a-59ca-4a34-bd9f-421c0efb5406";
            this.redirectUri = "http://localhost:30466/Incidents";
            this.incidentUri = "http://localhost:30466/Incident/";
            this.proactiveCommunicationUri = "http://localhost:30466/Proactive/";
            this.OSPSHDLink = "https://osp.officeppe.net/ospapp/Toolbox/Prod/cma/edit-incident?eventId=";
        }
        else if (location.hostname === "ductwebtest") {
            this.urlBase = "https://ductwebtestapi/api/";
            this.newDuctCaseUri = "https://ductwebtest/Engage/New";
            this.engageConfirmUri = "https://ductwebtest/Engage/Confirm/";
            this.icmUrlBase = "https://icm.ad.msoppe.msft.net/imp/IncidentDetails.aspx?id=";
            this.tenant = "microsoft.onmicrosoft.com";
            this.clientId = "37a775b5-318a-4c78-830f-4c113ee12b27";
            this.redirectUri = "https://ductwebtest/Incidents";
            this.incidentUri = "https://ductwebtest/Incident/";
            this.proactiveCommunicationUri = "http://ductwebtest/Proactive/";
            this.OSPSHDLink = "https://osp.officeppe.net/ospapp/Toolbox/Prod/cma/edit-incident?eventId=";
        }
        else {
            this.urlBase = "https://ductwebapi/api/";
            this.newDuctCaseUri = "https://ductweb/Engage/New";
            this.engageConfirmUri = "https://ductweb/Engage/Confirm/";
            this.icmUrlBase = "https://icm.ad.msft.net/imp/IncidentDetails.aspx?id=";
            this.tenant = "microsoft.onmicrosoft.com";
            this.clientId = "eed543e8-2e0f-4236-96b2-c4951f9507dc";
            this.redirectUri = "https://ductweb/Incidents";
            this.incidentUri = "https://ductweb/Incident/";
            this.proactiveCommunicationUri = "http://ductweb/Proactive/";
            this.OSPSHDLink = "https://osp.office.net/ospapp/Toolbox/Prod/cma/edit-incident?eventId=";
        }

        this.disableAuth = false;
        this.skipAuthentication = false;

        //Uncomment if developing locally and you do not want sts to kick in.
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            this.skipAuthentication = true;
            this.disableAuth = true;
        }

        this.successPanelStyle = "success";
        this.warningPanelStyle = "warning";
        this.dangerPanelStyle = "danger";
        this.noNextUpdateTimeIndicated = "None Indicated";
        this.countdownPanelHeaderText = "Next Update";
        this.countdownPanelHeaderExpired = "PAST DUE";
        this.countdownPanelUpdateTimeMissed = "MISSED";
        this.updateTimeThresholdDanger = 600000; // 10 minutes.
        this.updateTimeThresholdWarning = 1200000; // 20 minutes.
        this.nextUpdateTimePoll = 1000;
        this.defaultLoopIntervalInMilliseconds = 1000;
        this.updateActiveDuctCaseInMilliseconds = 30000;
        this.updatePendingIncidentsInMilliseconds = 30000;
        this.updateRenewTokenInMilliseconds = 3300000; // 55 minutes.
        this.formatStringDateTime = "MM/DD/YYYY HH:mm";
        this.formatStringCountdownDateTime = "MM/DD/YYYY HH:mm:ss";
        this.formatStringPreviousUpdatesDateTime = "MM/DD/YYYY hh:mm A";
        this.updateClockIntervalInMilliseconds = 10000;
        // tslint:disable-next-line:max-line-length
        this.DOCAODLink = "https://icm.ad.msft.net/imp/v3/oncall/current?categoryId=0&serviceId=20322&teamIds=22841&scheduleType=current&shiftType=current&viewType=1gridViewSelectedDateRangeType=4";
        // tslint:disable-next-line:max-line-length
        this.CRMAODLink = "https://icm.ad.msft.net/imp/v3/oncall/current?categoryId=0&serviceId=20322&teamIds=31157&scheduleType=current&shiftType=current&viewType=NaN&gridViewSelectedDateRangeType=7";
        // tslint:disable-next-line:max-line-length
        this.CMFTEAODWeekdayLink = "https://icm.ad.msft.net/imp/v3/oncall/current?categoryId=0&serviceId=20322&teamIds=30088&scheduleType=current&shiftType=current&viewType=1&gridViewSelectedDateRangeType=4";
        // tslint:disable-next-line:max-line-length
        this.CMFTEAODWeekendLink = "https://icm.ad.msft.net/imp/v3/oncall/current?categoryId=0&serviceId=20322&teamIds=22886&scheduleType=current&shiftType=current&viewType=1&gridViewSelectedDateRangeType=4";
        this.FeedbackLink = "https://tasks.office.com/microsoft.onmicrosoft.com/en-GB/Home/PlanViews/OUO2Wrig4Uupau3jGMq-bmQAGHJI";
        this.WhiteboardLink = "https://icm.ad.msft.net/imp/v3/outages/details/{IcmId}";
        this.serverMinDate = new Date("0001-01-01T00:00:00Z");
        this.initialCommDue = 1200000; // 20 minutes.
        this.defaultNoAuthUserName = "NoName";
        this.defaultNoAuthEmailAddress = "AuthDisabled";
        this.defaultLanguageCode = 9; //en
    }
}