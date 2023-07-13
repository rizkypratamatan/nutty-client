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
export class UserGroupService {
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
    
    public getAllGroup(filter,page): Observable<any> {
        
        let auth = this.authServices.Auth();
        let limit = 10
        let offset = 0
        if(page > 1){
            offset = limit * (page - 1);
        }
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            name: (filter.name)?filter.name:"",
            website: (filter.website)?filter.website:"",
            nucode: (filter.nucode)?filter.nucode:"",
            type: (filter.type)?filter.type:"",
            status: (filter.status)?filter.status:""
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-user-group',
            this.globalRestService.initializeBody(data, 'api/get-user-group'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getGroupById(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };
        
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
        let auth = this.authServices.Auth();

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
        let auth = this.authServices.Auth();
        request.id = id;

        return this.http.post(
            this.configuration.api.url + '/api/update-user-group',
            this.globalRestService.initializeBody(
                request,
                'api/update-user-group'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public deleteGroup(id): Observable<any> {
        let auth = this.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/delete-user-group',
            this.globalRestService.initializeBody(id, 'api/delete-user-group'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
