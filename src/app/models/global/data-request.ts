import {BaseRequest} from './base-request';


export class DataRequest extends BaseRequest {

    public id: string;


    constructor(timestamp: string, token: string, id: string) {

        super(timestamp, token);
        this.id = id;

    }

}
