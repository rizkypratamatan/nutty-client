import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { AuthService } from '../global/auth.service';

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
        private authServices: AuthService
    ) {
        this.configuration = this.configurationService;
    }

    public getAllSMS(filter, page): Observable<any> {
        let auth = this.authServices.Auth();
        let limit = 10;
        let offset = 0;
        if(page > 1){
            offset = limit * (page - 1);
        }

        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            phone: filter.phone,
            message: filter.message,
            status: filter.status
        };
        
        return this.http.post(
            this.configuration.api.url + '/api/sms/get-messages',
            this.globalRestService.initializeBody(data, 'api/sms/get-messages'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public sendSingleSMS(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/sms/send-single-message',
            this.globalRestService.initializeBody(
                request,
                'api/sms/send-single-message'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public sendBulkSMS(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/sms/send-bulk-message',
            this.globalRestService.initializeBody(
                request,
                'api/sms/send-bulk-message'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public deleteSMS(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id.id,
        };

        return this.http.post(
            this.configuration.api.url + '/api/sms/delete-message',
            this.globalRestService.initializeBody(data, 'api/sms/delete-message'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
