import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';
import { AuthService } from '../global/auth.service';

@Injectable({
    providedIn: 'root',
})
export class WhatsappService {
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

    public getAllWA(filter, page): Observable<any> {
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
            recipient: filter.recipient,
            message: filter.message,
            status: filter.status
        };

        return this.http.post(
            this.configuration.api.url + '/api/whatsapp/get-chats',
            this.globalRestService.initializeBody(data, 'api/whatsapp/get-chats'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public sendSingleChat(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/whatsapp/send-single-chat',
            this.globalRestService.initializeBody(
                request,
                'api/whatsapp/send-single-chat'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public sendBulkChat(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/whatsapp/send-bulk-chat',
            this.globalRestService.initializeBody(
                request,
                'api/whatsapp/send-bulk-chat'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public deleteChat(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id.id,
        };

        return this.http.post(
            this.configuration.api.url + '/api/whatsapp/delete-chat',
            this.globalRestService.initializeBody(data, 'api/whatsapp/delete-chat'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
