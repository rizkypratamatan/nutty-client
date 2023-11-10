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
import { RegisterRequest } from "src/app/models/register/register-request.request";


@Injectable()
export class RegisterService {

    public configuration: ConfigurationService;


    constructor(private httpClient: HttpClient, private configurationService: ConfigurationService, private encryptionService: EncryptionService, private restService: RestService) {

        this.configuration = this.configurationService;

    }


    public register(fields): Observable<any> {

        const data: RegisterRequest = new RegisterRequest('', '', Platform.Website, fields.username, fields.password, fields.nucode, fields.name, fields.email);

        return this.httpClient.post(
          this.configuration.api.url + '/api/regsiter', 
          this.restService.initializeBody(data, 'api/regsiter'), 
          this.restService.initializeOption());

      //   return this.httpClient.post(
      //     this.configuration.api.url + '/api/get-websites',
      //     this.globalRestService.initializeBody(data, 'api/get-websites'),
      //     this.globalRestService.initializeHeaderGetData(auth['token-auth'])
      // );

    }


    public logout(authentication: string, userId: string): Observable<BaseResponse> {

        const data: UserLogoutRequest = new UserLogoutRequest('', '', this.encryptionService.aesDecrypt(authentication), Platform.Website, userId);

        return this.httpClient.post<BaseResponse>(this.configuration.api.url + '/user/log/logout', this.restService.initializeBody(data, 'user/log/logout'), this.restService.initializeOption());

    }

}
