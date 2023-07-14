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
        
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/result',
            this.globalRestService.initializeBody(data, 'api/worksheet/result'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public initializeData(filter, page): Observable<any> {
        let auth = this.userServices.Auth();
        
        let limit = 20;
        let offset = 0;
        if(page > 1){
            offset = limit * (page - 1);
        }

        let data = {
            platform: 'Website',
            websiteId: filter.websiteId,
            limit: limit,
            offset: offset
        };
        
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/initializeData',
            this.globalRestService.initializeBody(data, 'api/worksheet/initializeData'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public processWhatsapp(status, websiteId, days): Observable<any> {
        let auth = this.userServices.Auth();
        let fields = {
            platform: 'Website',
            status: status,
            website: websiteId,
            days:days
        }
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/process-wa',
            this.globalRestService.initializeBody(
                fields,
                'api/worksheet/process-wa'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public processSms(status, websiteId, days): Observable<any> {
        let auth = this.userServices.Auth();
        let fields = {
            platform: 'Website',
            status: status,
            website: websiteId,
            days:days
        }
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/process-sms',
            this.globalRestService.initializeBody(
                fields,
                'api/worksheet/process-sms'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public processEmail(status, websiteId, days): Observable<any> {
        let auth = this.userServices.Auth();
        let fields = {
            platform: 'Website',
            status: status,
            website: websiteId,
            days:days
        }
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/process-email',
            this.globalRestService.initializeBody(
                fields,
                'api/worksheet/process-email'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public worksheetCall(id, websiteId): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            id: id,
            websiteId: websiteId
        };
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/call/initialize-data',
            this.globalRestService.initializeBody(
                data,
                'api/worksheet/call/initialize-data'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public updateDatabase(id, fields): Observable<any> {
        let auth = this.userServices.Auth();
        let data = {
            id: id,
            name: fields.name,
            account: {
              username: fields.account.username
            },
            log: {
              id: fields.log.id
            },
            status:fields.status,
            reference: fields.reference,
            websiteId: fields.websiteId,
            group: fields.group
        };
        
        return this.http.post(
            this.configuration.api.url + '/api/worksheet/update',
            this.globalRestService.initializeBody(
                data,
                'api/worksheet/update'
            ),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
    

    
}
