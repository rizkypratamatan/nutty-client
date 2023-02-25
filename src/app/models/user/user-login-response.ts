import {BaseResponse} from '../global/base-response';
import {User} from './user';


export class UserLoginResponse extends BaseResponse {

    public account: User;

    public authentication: string;


    constructor(response: string, result: boolean, account: User, authentication: string) {

        super(response, result);
        this.account = account;
        this.authentication = authentication;

    }

}
