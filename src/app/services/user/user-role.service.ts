import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';
import { AuthService } from '../global/auth.service';

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
        private authServices: AuthService,
    ) {
        this.configuration = this.configurationService;
    }

    public getAllRole(filter, page): Observable<any> {
        let auth = this.authServices.Auth();
        let limit = 10;
        let offset = 0;
        if(page > 1){
            offset = limit * (page -1)
        }
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
            name:filter.name,
            nucode:filter.nucode,
            status:filter.status
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-all-role',
            this.globalRestService.initializeBody(data, 'api/get-all-role'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getRoleById(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };
        
        return this.http.post(
            this.configuration.api.url + '/api/get-role-by-id',
            this.globalRestService.initializeBody(data, 'api/get-role-by-id'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public addRole(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-role',
            this.globalRestService.initializeBody(
                request,
                'api/add-role'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateRole(id, request): Observable<any> {
        let auth = this.authServices.Auth();
        request.id = id;

        return this.http.post(
            this.configuration.api.url + '/api/update-role',
            this.globalRestService.initializeBody(
                request,
                'api/update-role'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
