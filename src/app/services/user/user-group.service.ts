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
export class UserGroupService {
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

    public getAllGroup(): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-user-group',
            this.globalRestService.initializeBody(data, 'api/get-user-group'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getGroupById(id): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };

        // console.log(this.globalRestService.initializeBody(data,'api/get-user-group-by-id'));return;
        
        return this.http.post(
            this.configuration.api.url + '/api/get-user-group-by-id',
            this.globalRestService.initializeBody(
                data,
                'api/get-user-group-by-id'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public addGroup(request): Observable<any> {
        let auth = this.userServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-user-group',
            this.globalRestService.initializeBody(
                request,
                'api/add-user-group'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateGroup(id, request): Observable<any> {
        let auth = this.userServices.Auth();
        request.id = id;

        // console.log(this.globalRestService.initializeBody(request, 'api/update-user'));
        // return;

        return this.http.post(
            this.configuration.api.url + '/api/update-user-group',
            this.globalRestService.initializeBody(
                request,
                'api/update-user-group'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
