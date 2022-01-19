import { Auth } from "./Auth";

export class Registry{
    public static auth: Auth = new Auth({
        realm: 'YourRealm',
        'auth-server-url': 'https://id.yourdomain.com/auth/',
        'ssl-required': 'external',
        'resource': 'YourResource',
        'clientId': 'YourClientId',
        'public-client': true,
        'confidential-port': 0
    });;
};
