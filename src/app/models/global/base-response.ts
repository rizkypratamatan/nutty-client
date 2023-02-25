export class BaseResponse {

    public response: string;

    public result: boolean;


    constructor(response: string, result: boolean) {

        this.response = response;
        this.result = result;

    }

}
