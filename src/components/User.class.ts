export class User{
    //The sub parameter of access token
    private userId: string;
    private username: string;
    private firstname: string;
    private lastname: string;
    private roles: Array<string>;

    public constructor(userId: string, username: string, firstname: string, lastname: string, roles: Array<string>){
        this.userId = userId;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.roles = roles;
    }

    public getUserId(): string{
        return this.userId;
    }

    public getUsername(): string{
        return this.username;
    }

    public getFirstname(): string{
        return this.firstname;
    }

    public getLastname(): string{
        return this.lastname;
    }

    public getRoles(): Array<string>{
        return this.roles;
    }

    //Checks whether user has all of the roles
    public hasRole(role: string | Array<string>): boolean{
        if(role instanceof Array){
            let contains = true;
            role.forEach((r) => {
                contains = contains && this.roles.includes(r);
            });
            return contains;
        }
        return this.roles.includes(role);
    }
}