import {BaseRequest} from '../global/base-request';
import {Platform} from '../../enums/global/platform';


export class UserLoginRequest extends BaseRequest {

    public password: string;

    public platform: Platform;

    public username: string;


    constructor(timestamp: string, token: string, password: string, platform: Platform, username: string) {

        super(timestamp, token);
        this.password = password;
        this.platform = platform;
        this.username = username;

    }

}
