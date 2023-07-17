import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { AuthService } from '../global/auth.service';

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
        private encryptionService: EncryptionService,
        private globalRestService: RestService,
        private authServices: AuthService
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

    public getAllUser(filter, page): Observable<any> {
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
            username: filter.username,
            name: filter.name,
            nucode: filter.nucode,
            type: filter.type,
            group: filter.group,
            role: filter.role,
            status: filter.status
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-all-user',
            this.globalRestService.initializeBody(data, 'api/get-all-user'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getUserById(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id
        };

        return this.http.post(
            this.configuration.api.url + '/api/user/initialize-data',
            this.globalRestService.initializeBody(data, 'api/user/initialize-data'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public addUser(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-user',
            this.globalRestService.initializeBody(request, 'api/add-user'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateUser(id, request): Observable<any> {
        let auth = this.authServices.Auth();
        request.id = id;

        return this.http.post(
            this.configuration.api.url + '/api/update-user',
            this.globalRestService.initializeBody(request, 'api/update-user'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public deleteUser(id): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/delete-user',
            this.globalRestService.initializeBody(id, 'api/delete-user'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
