import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { AuthService } from '../global/auth.service';

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
        private authServices: AuthService
    ) {
        this.configuration = this.configurationService;
    }

    public getAllDatabase(filter, page): Observable<any> {
        let auth = this.authServices.Auth();
        let limit = 20;
        let offset = 0;
        if(page > 1){
            offset = limit * (page - 1);
        }
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            name: filter.name,
            phone: filter.phone,
            website: filter.website,
        };
        
        return this.http.post(
            this.configuration.api.url + '/api/get-database',
            this.globalRestService.initializeBody(data, 'api/get-database'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getDatabaseById(id): Observable<any> {
        let auth = this.authServices.Auth();
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
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-database',
            this.globalRestService.initializeBody(request, 'api/add-database'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateDatabase(id, request): Observable<any> {
        let auth = this.authServices.Auth();
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
