import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRestService } from './user-rest.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { ConfigurationService } from 'src/app/configurations/configuration.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // private base_url = 'http://localhost:8000/';
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private restService: UserRestService,
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

    public getAllUser(): Observable<any> {
        let auth = this.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-all-user',
            this.globalRestService.initializeBody(data, 'api/get-all-user'),
            this.restService.initializeHeaderGetUser(auth['token-auth'])
        );
    }

    public getAllGroup(): Observable<any> {
        let auth = this.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-user-group',
            this.globalRestService.initializeBody(data, 'api/get-user-group'),
            this.restService.initializeHeaderGetUser(auth['token-auth'])
        );
    }

    public getAllRole(): Observable<any> {
        let auth = this.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-all-role',
            this.globalRestService.initializeBody(data, 'api/get-all-role'),
            this.restService.initializeHeaderGetUser(auth['token-auth'])
        );
    }
}
