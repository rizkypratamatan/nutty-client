import { Platform } from "src/app/enums/global/platform";
import { BaseRequest } from "../global/base-request";

export class RegisterRequest extends BaseRequest{

    public platform: Platform;

    public username: string;
    public password: string;
    public nucode: string;
    public name: string;
    public email: string;


    constructor(timestamp: string, 
                token: string, 
                platform: Platform,
                username: string,
                password: string,
                nucode: string,
                name: string,
                email: string) {

        super(timestamp, token);
        this.password = password;
        this.platform = platform;
        this.username = username;
        this.nucode = nucode;
        this.name = name;
        this.email = email;

    }
}
