import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

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
        private userServices: UserService
    ) {
        this.configuration = this.configurationService;
    }

    public getAllWebsite(): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            platform: 'Website',
            limit: 10,
            offset: 0,
        };

        return this.http.post(
            this.configuration.api.url + '/api/get-websites',
            this.globalRestService.initializeBody(data, 'api/get-websites'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getWebsiteById(id): Observable<any> {
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

    public addWebsite(request): Observable<any> {
        let auth = this.userServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-website',
            this.globalRestService.initializeBody(request, 'api/add-website'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateWebsite(id, request): Observable<any> {
        let auth = this.userServices.Auth();
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
}
