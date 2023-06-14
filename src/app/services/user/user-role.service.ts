import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class UserRoleService {
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private encryptionService: EncryptionService,
        private globalRestService: RestService,
        private userServices: UserService,
    ) {
        this.configuration = this.configurationService;
    }

    public getAllRole(): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-all-role',
            this.globalRestService.initializeBody(data, 'api/get-all-role'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getRoleById(id): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };
        // console.log(data);return;
        return this.http.post(
            this.configuration.api.url + '/api/get-role-by-id',
            this.globalRestService.initializeBody(data, 'api/get-role-by-id'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public addRole(request): Observable<any> {
        let auth = this.userServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-role',
            this.globalRestService.initializeBody(request, 'api/add-role'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
