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
export class WebsiteService {
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

    public getAllWebsite(filter, page): Observable<any> {
        let auth = this.authServices.Auth();
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
            this.configuration.api.url + '/api/get-websites',
            this.globalRestService.initializeBody(data, 'api/get-websites'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getWebsiteById(id): Observable<any> {
        let auth = this.authServices.Auth();
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

    public addWebsite(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-website',
            this.globalRestService.initializeBody(request, 'api/add-website'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateWebsite(id, request): Observable<any> {
        let auth = this.authServices.Auth();
        request.id = id;

        return this.http.post(
            this.configuration.api.url + '/api/update-website',
            this.globalRestService.initializeBody(
                request,
                'api/update-website'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
    public deleteWebsite(id): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/delete-website',
            this.globalRestService.initializeBody(id, 'api/delete-website'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
