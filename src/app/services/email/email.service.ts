import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';
import { AuthService } from '../global/auth.service';

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
        private authServices: AuthService
    ) {
        this.configuration = this.configurationService;
    }

    public getEmails(filter, page): Observable<any> {
        let auth = this.authServices.Auth();
        let limit = 10;
        let offset = 0;
        if (page > 1) {
            offset = limit * (page - 1);
        }
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            from_name: filter.from_name,
            email: filter.email,
            subject: filter.subject,
            message: filter.message,
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
