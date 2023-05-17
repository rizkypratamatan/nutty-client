import {Injectable} from "@angular/core";
import {ConfigurationService} from "../../configurations/configuration.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EncryptionService} from "../global/encryption.service";
import {RestService} from "../global/rest.service";
import {UserLoginResponse} from "../../models/user/user-login-response";
import {UserLoginRequest} from "../../models/user/user-login-request";
import {Platform} from "../../enums/global/platform";
import {BaseResponse} from "../../models/global/base-response";
import {UserLogoutRequest} from "../../models/user/user-logout-request";


@Injectable()
export class UserLogService {

    public configuration: ConfigurationService;


    constructor(private httpClient: HttpClient, private configurationService: ConfigurationService, private encryptionService: EncryptionService, private restService: RestService) {

        this.configuration = this.configurationService;

    }


    public login(password: string, username: string): Observable<UserLoginResponse> {

        const data: UserLoginRequest = new UserLoginRequest('', '', password, Platform.Website, username);
        console.log(data);

        return this.httpClient.post<UserLoginResponse>(this.configuration.api.url + '/', this.restService.initializeBody(data, '/api/login'), this.restService.initializeOption());

    }


    public logout(authentication: string, userId: string): Observable<BaseResponse> {

        const data: UserLogoutRequest = new UserLogoutRequest('', '', this.encryptionService.aesDecrypt(authentication), Platform.Website, userId);

        return this.httpClient.post<BaseResponse>(this.configuration.api.url + '/user/log/logout', this.restService.initializeBody(data, '/user/log/logout'), this.restService.initializeOption());

    }

}
