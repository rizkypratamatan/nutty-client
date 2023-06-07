import {BaseResponse} from '../global/base-response';
import {User} from './user';


export class UserLoginResponse extends BaseResponse {

    public dataUser: User;


    constructor(response: string, result: boolean, dataUser: User) {

        super(response, result);
        this.dataUser = dataUser;

    }

}
