import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';

@Injectable({
    providedIn: 'root',
})
export class UserRestService {
    public configuration: ConfigurationService;

    constructor(private configurationService: ConfigurationService) {
        this.configuration = this.configurationService;
    }

    public initializeHeaderGetUser(token: string): any {
        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'nu-key': this.configuration.api.key,
                'token-auth': token,
            }),
        };

        return header;
    }
}
