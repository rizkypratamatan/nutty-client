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

        return this.http.post(
            this.configuration.api.url + '/api/email/get-emails',
            this.globalRestService.initializeBody(data, 'api/email/get-emails'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public sendSingleEmail(request): Observable<any> {
        let auth = this.authServices.Auth();
        
        return this.http.post(
            this.configuration.api.url + '/api/email/send-single-email',
            this.globalRestService.initializeBody(
                request,
                'api/email/send-single-email'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public sendBulkEmail(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/email/send-bulk-email',
            this.globalRestService.initializeBody(
                request,
                'api/email/send-bulk-email'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public deleteEmail(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id.id,
        };

        return this.http.post(
            this.configuration.api.url + '/api/email/delete-email',
            this.globalRestService.initializeBody(data, 'api/email/delete-email'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
