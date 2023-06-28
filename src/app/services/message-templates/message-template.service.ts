import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { AuthService } from '../global/auth.service';

@Injectable({
    providedIn: 'root',
})
export class MessageTemplateService {
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

    public getAllMessageTemplate(filter, page): Observable<any> {
        let auth = this.authServices.Auth();

        let limit = 10;
        let offset = 0;
        if (page > 1) {
            offset = limit * (page - 1);
        }
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
        };
        // console.log(this.globalRestService.initializeBody(data, 'api/get-all-template'));return;
        return this.http.post(
            this.configuration.api.url + '/api/get-all-template',
            this.globalRestService.initializeBody(data, 'api/get-all-template'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public addMessage(request): Observable<any> {
        let auth = this.authServices.Auth();

        return this.http.post(
            this.configuration.api.url + '/api/add-template',
            this.globalRestService.initializeBody(request, 'api/add-template'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getMessageById(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };

        // console.log(this.globalRestService.initializeBody(data,'api/get-template-by-id'));return;

        return this.http.post(
            this.configuration.api.url + '/api/get-template-by-id',
            this.globalRestService.initializeBody(
                data,
                'api/get-template-by-id'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateTemplate(id, request): Observable<any> {
        let auth = this.authServices.Auth();
        request.id = id;

        // console.log(this.globalRestService.initializeBody(request, 'api/update-user'));
        // return;

        return this.http.post(
            this.configuration.api.url + '/api/update-template',
            this.globalRestService.initializeBody(
                request,
                'api/update-template'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public deleteTemplate(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id.id,
        };

        // console.log(this.globalRestService.initializeBody(id, 'api/delete-template')); return;

        return this.http.post(
            this.configuration.api.url + '/api/delete-template',
            this.globalRestService.initializeBody(data, 'api/delete-template'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
