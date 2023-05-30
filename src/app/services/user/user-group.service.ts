import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserGroupService {
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private encryptionService: EncryptionService,
        private globalRestService: RestService
    ) {
        this.configuration = this.configurationService;
    }

    public Auth() {
        this.accountData = localStorage.getItem('nu-account');
        this.auth = JSON.parse(
            this.encryptionService.aesDecrypt(this.accountData)
        );

        return this.auth;
    }

    public getAllGroup(): Observable<any> {
        let auth = this.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        console.log(this.configuration.api.url + '/api/get-user-group');
        console.log(
            this.globalRestService.initializeBody(data, 'api/get-user-group')
        );
        console.log(
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );

        return this.http.post(
            this.configuration.api.url + '/api/get-user-group',
            this.globalRestService.initializeBody(data, 'api/get-user-group'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
