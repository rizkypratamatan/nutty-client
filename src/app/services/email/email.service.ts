import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { RestService } from '../global/rest.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
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

    public getEmailInbox(): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };
        // console.log(this.globalRestService.initializeBody(data, 'api/email/get-emails'));
        // return;

        return this.http.post(
            this.configuration.api.url + '/api/email/get-emails',
            this.globalRestService.initializeBody(data, 'api/email/get-emails'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
