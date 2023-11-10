import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { AuthService } from '../global/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SettingService {
    public configuration: ConfigurationService;

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private encryptionService: EncryptionService,
        private globalRestService: RestService,
        private authServices: AuthService
    ) {
        this.configuration = this.configurationService;
    }

    public getAllSetting(filter, nucode): Observable<any> {
        let auth = this.authServices.Auth();

        let data = {
            platform: 'Website',
            intervalSMS: filter.intervalSMS,
            intervalWhatsApp: filter.intervalWhatsApp,
            intervalEmail: filter.intervalEmail,
            nucode: nucode,
        };

        return this.http.post(
            this.configuration.api.url + '/api/setting/get-setting',
            this.globalRestService.initializeBody(
                data,
                'api/setting/get-setting'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getAllNucode(): Observable<any> {
        let auth = this.authServices.Auth();

        let data = {
            platform: 'Website',
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-all-nucode',
            this.globalRestService.initializeBody(
                data,
                'api/get-all-nucode'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateSetting(request, nucode): Observable<any> {
        let auth = this.authServices.Auth();

        let data = {
            platform: 'Website',
            interval_sms: request.intervalSMS,
            interval_wa: request.intervalWhatsApp,
            interval_email: request.intervalEmail,
            mailgun_domain: request.mailgun_domain,
            mailgun_secret: request.mailgun_secret,
            from_name: request.from_name,
            from_email: request.from_email,
            gateway_apikey: request.gateway_apikey,
            nucode: nucode
        };

        return this.http.post(
            this.configuration.api.url + '/api/setting/update-setting',
            this.globalRestService.initializeBody(
                data,
                'api/setting/update-setting'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
