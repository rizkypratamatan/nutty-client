import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from '../global/encryption.service';
import { RestService } from '../global/rest.service';
import { Observable } from 'rxjs';

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
    private globalRestService: RestService
  ) {
    this.configuration = this.configurationService;
  }

  public Auth() {
    this.accountData = localStorage.getItem('nu-account');
    this.auth = JSON.parse(
        this.encryptionService.aesDecrypt(this.accountData)
    );

    return this.auth;
  }

  public import(data): Observable<any> {
    let auth = this.Auth();
    let headers = this.globalRestService.initializeHeaderMultipartData(auth['token-auth']);

    return this.http.post(
        this.configuration.api.url + '/api/import-database',
        this.globalRestService.initializeBody(data, 'api/import-database'),
        headers
    );
  }
}
