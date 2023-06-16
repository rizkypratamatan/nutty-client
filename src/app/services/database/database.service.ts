import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private encryptionService: EncryptionService,
        private globalRestService: RestService,
        private userServices: UserService
    ) {
        this.configuration = this.configurationService;
    }

    public getAllWebsite(): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-database',
            this.globalRestService.initializeBody(data, 'api/get-database'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
