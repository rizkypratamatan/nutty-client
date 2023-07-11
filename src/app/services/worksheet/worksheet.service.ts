import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorksheetService {
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

    public getAllCrm(filter, page): Observable<any> {
        let auth = this.userServices.Auth();
        let limit = 20;
        let offset = 0;
        if(page > 1){
            offset = limit * (page - 1);
        }
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            websiteId: filter.websiteId,
            days:filter.days
        };
        console.log(this.globalRestService.initializeBody(data, 'api/worksheet/crm'))
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/crm',
            this.globalRestService.initializeBody(data, 'api/worksheet/crm'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getResult(filter, page): Observable<any> {
        let auth = this.userServices.Auth();
        let limit = 20;
        let offset = 0;
        if(page > 1){
            offset = limit * (page - 1);
        }
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            filter_name: filter.filter_name,
            filter_phone: filter.filter_phone,
            filter_status: filter.filter_status,
            filter_user: filter.filter_user,
            filter_username: filter.filter_username,
            filter_website: filter.filter_website,
            filter_whatsapp:filter.filter_whatsapp,
            filter_date:filter.filter_date
        };

        console.log(this.globalRestService.initializeBody(data, 'api/worksheet/result'))
        
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/result',
            this.globalRestService.initializeBody(data, 'api/worksheet/result'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    
}
