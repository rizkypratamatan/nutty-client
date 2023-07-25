import {Injectable} from '@angular/core';
import {GlobalConfiguration} from './global.configuration';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ConfigurationService extends GlobalConfiguration {

    constructor(private httpClient: HttpClient) {

        super();

    }


    public initialize(): Promise<void> {

        return this.httpClient.get<GlobalConfiguration>('configuration.json').toPromise().then(data => {

            this.api = data.api;
            this.application = data.application;
            this.encryption = data.encryption;
            this.resource = data.resource;

        }).catch((exception) => {

            console.error(exception);

        });

    }

}
