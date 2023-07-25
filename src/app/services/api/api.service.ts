import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

    public getAll(filter, page): Observable<any> {
        let auth = this.userServices.Auth();
        let limit = 10
        let offset = 0
        if(page > 1){
            offset = (limit * (page - 1));
        }
        
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            page: page,
            name: (filter.name)?filter.name:"",
            nucode: (filter.nucode)?filter.nucode:"",
            type: (filter.type)?filter.type:"",
            status: (filter.status)?filter.status:"",
        };
        return this.http.post(
            this.configuration.api.url + '/api/setting/get-api',
            this.globalRestService.initializeBody(data, 'api/setting/get-api'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getApiById(id): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-website-by-id',
            this.globalRestService.initializeBody(
                data,
                'api/get-website-by-id'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateApi(id, request): Observable<any> {
        let auth = this.userServices.Auth();
        request.id = id;
        return this.http.post(
            this.configuration.api.url + '/api/setting/update-api',
            this.globalRestService.initializeBody(
                request,
                'api/setting/update-api'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public syncApi(id): Observable<any> {
        let auth = this.userServices.Auth();
        let fields = {
            platform: 'Website',
            timestamp: '',
            token: '',
            id: id
        }
        return this.http.post(
            this.configuration.api.url + '/api/setting/sync-api',
            this.globalRestService.initializeBody(
                fields,
                'api/setting/sync-api'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
