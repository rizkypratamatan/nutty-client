import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public addUser(request): Observable<any> {
        let auth = this.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-user',
            this.globalRestService.initializeBody(request, 'api/add-user'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    // public deleteUser(request): Observable<any> {
    //     let auth = this.Auth();

    //     console.log(this.globalRestService.initializeBody(request, 'api/delete-user'));

    //     return this.http.post(
    //         this.configuration.api.url + '/api/delete-user',
    //         this.globalRestService.initializeBody(request, 'api/delete-user'),
    //         this.globalRestService.initializeHeaderGetData(auth['token-auth'])
    //     );
    // }
}
