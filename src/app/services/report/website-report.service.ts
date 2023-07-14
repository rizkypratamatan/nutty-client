import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { RestService } from '../global/rest.service';
import { AuthService } from '../global/auth.service';

@Injectable({
    providedIn: 'root',
})
export class WebsiteReportService {
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

    public getAllWebsiteReport(filter, page): Observable<any> {
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
            website: filter.website,
            nucode: filter.nucode,
            date: filter.filter_date,
        };
        console.log(filter);

        // console.log(this.globalRestService.initializeBody(data, 'api/website-report'));return;

        return this.http.post(
            this.configuration.api.url + '/api/website-report',
            this.globalRestService.initializeBody(data, 'api/website-report'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }
}
