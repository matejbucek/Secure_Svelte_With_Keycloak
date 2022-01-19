import { Observable } from "./observer/Observable";
import type { User } from "./User";

export class Auth{
    private keycloak: any;
    private observable: Observable<User>;
    private user: User;
    private initInProgress: boolean = false;

    public constructor(options: any){
        this.observable = new Observable<User>();
        //@ts-ignore
        this.keycloak = new Keycloak(options);
        this.user = null;
        if(localStorage.getItem("access_token") !== null)
            this.init(this.buildInitParams());
    }

    private init(params?){
        this.initInProgress = true;
        this.keycloak.init(params).then(
            (authenticated) => {
                if(authenticated){
                    localStorage.setItem("access_token", this.keycloak.token);
                    localStorage.setItem("refresh_token", this.keycloak.refreshToken);
                    localStorage.setItem("exp", this.keycloak.tokenParsed["exp"]);
                    this.buildUser();
                    this.keycloak.onTokenExpired = () => {
                        this.keycloak.updateToken(5).then(
                            (refreshed) => {
                                if(refreshed){
                                    localStorage.setItem("access_token", this.keycloak.token);
                                    localStorage.setItem("refresh_token", this.keycloak.refreshToken);
                                    localStorage.setItem("exp", this.keycloak.tokenParsed["exp"]); 
                                    this.buildUser();
                                }
                            }
                        );
                    };
                }
                this.initInProgress = false;
            }
        );
    }

    private buildUser(){
        let parsed = this.keycloak.tokenParsed;
        this.user = {userId: parsed["sub"], username: parsed["preferred_username"], firstname: parsed["given_name"], lastname: parsed["family_name"], roles: parsed["realm_access"]["roles"]};
        this.observable.next(this.user);
    }

    private buildInitParams(){
        return {
            token: localStorage.getItem("access_token"),
            refreshToken: localStorage.getItem("refresh_token")
        };
    }

    public getUser(): Observable<User>{
        return this.observable;
    }

    public login(options: {redirectUri: string}){
        if(this.initInProgress)
            return;
        this.keycloak.init();
        this.keycloak.login(options);
    }

    public logout(){
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("exp");
        this.keycloak.logout();
    }

    public checkParams(){
        let params = (new URL(document.location.href.replace("#", "?"))).searchParams;
        if(params.get("state") && params.get("session_state") && params.get("code")){
            this.init(this.buildInitParams());
        }
    }
};