import {BaseRequest} from '../global/base-request';
import {Platform} from '../../enums/global/platform';


export class UserLogoutRequest extends BaseRequest {

    public authentication: string;

    public platform: Platform;

    public userId: string;


    constructor(timestamp: string, token: string, authentication: string, platform: Platform, userId: string) {

        super(timestamp, token);
        this.authentication = authentication;
        this.platform = platform;
        this.userId = userId;

    }

}
