import { Configuration } from '../configuration';
import { UserProfile } from '../model/UserProfile';
// import { DuctRole }               from '../model/enums/DuctRole'
import { UserRole } from '../model/UserRole';
// import { LoggingService }         from '../services/logging.service';
import { ApiCall, IApiCallProps } from './ApiCall';
import { LoopedTask } from './common/LoopedTask';
// import { NumberDeserializer }     from '../shared/NumberDeserializer';
// import { Router }                 from "@angular/router";
// import { LoopedTask }             from '../shared/LoopedTask';

const SECURITY_SERVICE_SOURCE: string = "SecurityService";

/***
 * AuthenticationContext - the AuthenticationContext object from adal.
 ***/
declare var AuthenticationContext: any;

// @Injectable()
/**
 * Security service handles all the adal and rbac calls.
 * @property authContext - Member variable that has authenticationContext with adal config initialized.
 * @property cachedUser - The parsed user object from id token.
 * @property cachedToken - The token for the specified resource from local storage cache.
 * @property userRoles - Current user role flags.
 * @property callGetUserRoles - Used to call the web API to get the current user role flags.
 * @property callRenewTokenLoop -- Used to periodically execute adal token renewal.
 * @property userRolesString - Used to store the ui groups display value.
 * @property isRunning - Flag to show spinner while the security service is making async calls.
 * @property userProfile - Contains the user profile details like display name, full name...
 * @property lastPollTime - The last time the adal token renewal was executed..
 */
export class SecurityService {
    public isRunning: boolean | undefined;

    public userProfile: UserProfile | undefined;

    protected lastPollTime: Date | undefined;

    private authContext: any;

    private cachedUser: any;

    private cachedToken: any;

    private userRoles: UserRole[] | undefined;

    private callGetUserRoles: ApiCall<IApiCallProps> | undefined;

    private callRenewTokenLoop: LoopedTask;

    private userRolesString: string | undefined;

    // /**
    //  * @constructor
    //  * @param http
    //  * @param loggingService
    //  * @param router
    //  */
    // constructor(
    //     private http: Http,
    //     private loggingService: LoggingService,
    //     private router: Router) {

    //     this.callRenewTokenLoop = new LoopedTask(
    //         this.callRenewTokenLoopAction.bind(this),
    //         Configuration.global.updateActiveDuctCaseInMilliseconds
    //     );
    // }
    constructor() {
        this.callRenewTokenLoop = new LoopedTask(
            this.callRenewTokenLoopAction.bind(this),
            Configuration.global.updateActiveDuctCaseInMilliseconds,
        );
    }
    /**
     * Initializes the adal config for the webapp.
     */
    public adalConfig(
        tenant: string,
        clientId: string,
        redirectUri: string,
        cacheLocation: string): any {
        return {
            tenant,
            clientId,
            redirectUri,
            cacheLocation,
        };
    }

    /**
     * Gets initial Idtoken for the app backend
     * Saves the resulting Idtoken in localStorage.
     * Also does redirect handling.
     */
    public loginWithRedirect(): any {
        if (this.skipAuthentication()) {
            this.loginWithNoAuthorization();
        } else {

            const redirectUri: string = window.location.origin.concat(window.location.pathname);
            const hash: string = window.location.hash;
            this.authContext = new AuthenticationContext(this.adalConfig(Configuration.global.tenant,
                Configuration.global.clientId,
                redirectUri,
                this.getCacheStorage()));
            // save the token if it is in the hash
            if (hash) {
                const requestInfo: any = this.authContext.getRequestInfo(hash);
                this.authContext.saveTokenFromHash(requestInfo);
            }

            if (!this.getCachedToken(Configuration.global.clientId)) {
                const isCallback: any = this.authContext.isCallback(window.location.hash);
                this.authContext.clearCache();
                this.authContext.login();
            } else {
                this.userProfile = this.getLoggedInUserProfile(Configuration.global.clientId);
                this.startPolling();
                this.populateUserRolesAndNavigate();
            }
        }
    }

    /**
     * Logout user will redirect page to logout endpoint.
     * After logout, it will redirect to post_logout page if provided.
     * TODO: discuss with Team on the logout options.
     */
    public logout(): void {
        this.authContext.logOut();
    }

    /**
     * Acquire token from cache if not expired and available. Acquires token from iframe if expired.
     * @param clientId - Resource identifying the target resource.
     * @returns - Token if exists and not expired or null.
     */
    public acquireToken(clientId: string, callback: (accessToken: any) => void): void {
        const winSelf = this;
        if (this.skipAuthentication()) {
            // winSelf.loggingService.log.AddDebug("Authorization is disabled. ", SECURITY_SERVICE_SOURCE);
            callback("NoToken");
        }

        if (!this.authContext) {
            this.authContext = new AuthenticationContext(
                this.adalConfig(
                    Configuration.global.tenant,
                    Configuration.global.clientId,
                    window.location.origin.concat(window.location.pathname),
                    this.getCacheStorage(),
                ),
            );
        }

        this.authContext.acquireToken(clientId, (error: any, token: any) => {
            if (error) {
                // winSelf.loggingService.log.AddError("Error acquiring token: '".concat(error).concat("'"), SECURITY_SERVICE_SOURCE);
            } else {
                // winSelf.loggingService.log.AddDebug("Successfully acquired token: '".concat(token).concat("'"), SECURITY_SERVICE_SOURCE);
                callback(token);
            }
        });
    }

    /**
     * If user object exists, returns it. Else creates a new user object by decoding id_token from the cache.
     * @param clientId - Resource identifying the target resource.
     * @returns - User's profile if exists otherwise returns null.
     */
    public getLoggedInUserProfile(clientId: string): UserProfile {
        // if (this.skipAuthentication()) {
        //     return new UserProfile(Configuration.global.defaultNoAuthUserName,
        //         Configuration.global.defaultNoAuthUserName,
        //         Configuration.global.defaultNoAuthEmailAddress);
        // }

        if (this.authContext != null) {
            this.cachedUser = this.authContext.getCachedUser();
            this.cachedToken = this.authContext.getCachedToken(clientId);
            if (this.cachedUser != null && this.cachedToken != null) {
                return new UserProfile(
                    this.cachedUser.profile.given_name,
                    this.cachedUser.profile.name,
                    this.cachedUser.profile.upn);
            }
        }
        return new UserProfile( "", "", "");
    }

    /**
     * Gets token for the specified resource from local storage cache
     * @param clientId - resource A URI that identifies the resource for which the token is valid.
     * @returns - token if exists and not expired or null
     */
    public getCachedToken(clientId: string): any {
        if (this.authContext == null) {
            return null;
        }

        this.cachedToken = this.authContext.getCachedToken(clientId);
        return this.cachedToken;
    }

    /**
     * Verifies if the user is authenticated for duct webapp.
     * @returns - Returns true if the user is authenticated.
     */
    public isUserAuthenticated(): boolean {
        return this.authContext._user !== null;
    }

    /**
     * Verifies if the user is member of the specified role.
     * @param - Role to check for.
     * @returns - Returns the true if the user is a member of the role else returns false.
     */
    public isMemberOf(role: UserRole): boolean {
        if (this.userRoles) {
            // tslint:disable-next-line:no-bitwise
            // if (this.userRoles & role) {
            //     return true;
            // }
        }
        return false;
    }

    /**
     * Populates user role information and navigates to user requested url.
     */
    private populateUserRolesAndNavigate(): void {
        // if (!this.userRoles) {
        //     this.isRunning = true;
        //     this.callGetUserRoles = new ApiCall<number>(
        //         this.http,
        //         this,
        //         this.loggingService,
        //         new NumberDeserializer(),
        //         Configuration.global.urlBase.concat("roles"),
        //         this.callGetUserRolesComplete.bind(this));
        //     this.callGetUserRoles.GetWithResponse();
        // } else {
        //     this.router.navigate([window.location.pathname]);
        // }
    }

    /**
     * This method is used only for debug purposes on the ui.
     * we will remove this for production.
     */
    private getUserRoleStrings(): void {
        this.userRolesString = "";
        // for (const role in UserRole) {
        //     // tslint:disable-next-line:no-bitwise
        //     if (!Number(role) && (this.userRoles & Number(UserRole[role]))) {
        //         this.userRolesString = this.userRolesString.concat(role, " ");
        //     }
        // }
    }

    /**
     * Starts polling.
     */
    private startPolling(): void {
        this.callRenewTokenLoop.StartLooping();
    }

    /**
     * Executed when the callRenewTokenLoop periodically executes.
     */
    private callRenewTokenLoopAction(): void {
        const self = this;
        this.acquireToken(
            Configuration.global.clientId,
            (accessToken: any): void => {
                // self.loggingService.log.AddDebug("Successfully renewed token: '".concat(accessToken).concat("'"), SECURITY_SERVICE_SOURCE);
                console.log("Successfully renewed token: '".concat(accessToken).concat("'"), SECURITY_SERVICE_SOURCE);
                self.callRenewTokenLoop.LoopAgain();
                self.lastPollTime = self.callRenewTokenLoop.lastLoopTime;
            });
    }

    /**
     * Executed when the callGetUserRoles is complete.
     */
    private callGetUserRolesComplete(): void {
        // this.userRoles = this.callGetUserRoles.data;
        // this.getUserRoleStrings();
        // this.loggingService.log.AddDebug(
        //     "Successfully got the user roles: '".concat(String(this.userRoles)).concat("'"),
        //     SECURITY_SERVICE_SOURCE
        // );
        this.isRunning = false;
        // this.router.navigate([window.location.pathname]);
    }

    /**
     * Gets the cache storage location based on the browser.
     */
    private getCacheStorage(): string {
        if (navigator.userAgent.indexOf('Edge') >= 0) {
            return 'localStorage';
        }
        return 'sessionStorage';
    }

    /**
     * Logs in the user with no Authorization.
     */
    private loginWithNoAuthorization(): any {
        this.userProfile = this.getLoggedInUserProfile(Configuration.global.clientId);
        // this.userRoles = 1; // admin
        this.getUserRoleStrings();
        this.isRunning = false;
        // this.router.navigate([window.location.pathname]);
    }

    /**
     * Returns true if user authentication is disabled.
     */
    private skipAuthentication(): boolean {
        return Configuration.global.disableAuth && Configuration.global.skipAuthentication;
    }
}
