import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';
import { AuthService } from '../global/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseImportService {

  public configuration: ConfigurationService;

  accountData: string;
  auth: [];

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService,
    private encryptionService: EncryptionService,
    private globalRestService: RestService,
    private authService: AuthService
  ) {
    this.configuration = this.configurationService;
  }

  public import(data): Observable<any> {
    let auth = this.authService.Auth();
    let headers = this.globalRestService.initializeHeaderMultipartData(auth['token-auth']);

    return this.http.post(
        this.configuration.api.url + '/api/import-database',
        this.globalRestService.initializeBody(data, 'api/import-database'),
        headers
    );
  }

  public getHistory(page) : Observable<any> {
    let auth = this.authService.Auth();
    let limit = 10
    let offset = 0
    if(page > 1){
        offset = limit * (page - 1);
    }
    let data = {
        platform: 'Website',
        limit: limit,
        offset: offset,
    };

    return this.http.post(
        this.configuration.api.url + '/api/import-database-history/',
        this.globalRestService.initializeBody(data, 'api/import-database-history'),
        this.globalRestService.initializeHeaderGetData(auth['token-auth'])
    );
  }

  public delete(id) : Observable<any> {
    let auth = this.authService.Auth();
    let data = {
        platform: 'Website',
        id: id
    };
    return this.http.post(
        this.configuration.api.url + '/api/import-database-delete',
        this.globalRestService.initializeBody(data, 'api/import-database-delete'),
        this.globalRestService.initializeHeaderGetData(auth['token-auth'])
    );
  }
}
