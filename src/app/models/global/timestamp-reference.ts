import {UserReference} from '../user/user-reference';


export class TimestampReference {

    public timestamp: Date;

    public user: UserReference;


    constructor(timestamp: Date, user: UserReference) {

        this.timestamp = timestamp;
        this.user = user;

    }

}
