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

    public getAllDatabase(): Observable<any> {
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

    public getDatabaseById(id): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };
        
        return this.http.post(
            this.configuration.api.url + '/api/get-database-by-id',
            this.globalRestService.initializeBody(
                data,
                'api/get-database-by-id'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public addDatabase(request): Observable<any> {
        let auth = this.userServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-database',
            this.globalRestService.initializeBody(request, 'api/add-database'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateDatabase(id, request): Observable<any> {
        let auth = this.userServices.Auth();
        request.id = id;
        // console.log(this.globalRestService.initializeBody(
        //     request,
        //     'api/update-database'
        // ));return;
        
        return this.http.post(
            this.configuration.api.url + '/api/update-database',
            this.globalRestService.initializeBody(
                request,
                'api/update-database'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
