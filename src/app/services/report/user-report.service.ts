import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { RestService } from '../global/rest.service';
import { AuthService } from '../global/auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserReportService {
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private globalRestService: RestService,
        private authServices: AuthService
    ) {
        this.configuration = this.configurationService;
    }

    public getAllUserReport(filter, page): Observable<any> {
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
            username: filter.username,
            name: filter.name,
            nucode: filter.nucode,
            date: filter.filter_date,
        };

        // console.log(this.globalRestService.initializeBody(data, 'api/user-report'));return;

        return this.http.post(
            this.configuration.api.url + '/api/user-report',
            this.globalRestService.initializeBody(data, 'api/user-report'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getUserById(request): Observable<any> {
        let auth = this.authServices.Auth();
        let limit = 10;
        let offset = 0;
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            userId: request.id,
            filter_date: request.filter_date,
        };

        // console.log(this.globalRestService.initializeBody(data, 'api/get-report-by-id'));
        // return;
        return this.http.post(
            this.configuration.api.url + '/api/get-report-by-id',
            this.globalRestService.initializeBody(data, 'api/get-report-by-id'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
