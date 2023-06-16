import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root',
})
export class SmsService {
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private globalRestService: RestService,
        private userServices: UserService
    ) {
        this.configuration = this.configurationService;
    }

    public sendSingleSMS(request): Observable<any> {
        let auth = this.userServices.Auth();
        console.log(request);return;

        return this.http.post(
            this.configuration.api.url + '/api/sms/send-test-single-message',
            this.globalRestService.initializeBody(
                request,
                'api/sms/send-test-single-message'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
