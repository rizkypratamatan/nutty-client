import {BaseRequest} from './base-request';


export class DeleteByIdRequest extends BaseRequest {

    public authentication: string;

    public id: string;


    constructor(timestamp: string, token: string, authentication: string, id: string) {

        super(timestamp, token);
        this.authentication = authentication;
        this.id = id;

    }

}
