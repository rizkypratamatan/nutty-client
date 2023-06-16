import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { RestService } from '../global/rest.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

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
        private userServices: UserService
    ) {
        this.configuration = this.configurationService;
    }

    public sendSingleChat(request): Observable<any> {
        let auth = this.userServices.Auth();
        // console.log(request);
        // return;

        return this.http.post(
            this.configuration.api.url + '/api/whatsapp/test-send-single-chat',
            this.globalRestService.initializeBody(
                request,
                'api/whatsapp/test-send-single-chat'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
