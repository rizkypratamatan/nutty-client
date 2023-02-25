export class BaseRequest {

    public timestamp: string;

    public token: string;


    constructor(timestamp: string, token: string) {

        this.timestamp = timestamp;
        this.token = token;

    }

}
