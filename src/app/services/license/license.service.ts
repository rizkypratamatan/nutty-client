import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { UserService } from '../user/user.service';
import { RestService } from '../global/rest.service';
import { EncryptionService } from '../global/encryption.service';
import { AuthService } from '../global/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LicenseService {
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private encryptionService: EncryptionService,
        private globalRestService: RestService,
        // private userServices: UserService
        private authServices: AuthService
    ) {
        this.configuration = this.configurationService;
    }

    public getAllLicense(filter, page): Observable<any> {
        let auth = this.authServices.Auth();
        let limit = 20;
        let offset = 0;
        if (page > 1) {
            offset = (limit * (page - 1));
        }
        let data = {
            platform: 'Website',
            limit: limit,
            offset: offset,
            nucode: (filter.nucode)?filter.nucode:""
        };


        return this.http.post(
            this.configuration.api.url + '/api/license/get',
            this.globalRestService.initializeBody(data, 'api/license/get'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public deleteLicense(id): Observable<any> {
        let auth = this.authServices.Auth();
        let data = {
            platform: 'Website',
            id: id,
        };

        // console.log(this.globalRestService.initializeBody(id, 'api/delete-license')); return;

        return this.http.post(
            this.configuration.api.url + '/api/license/delete',
            this.globalRestService.initializeBody(data, 'api/license/delete'),
            this.globalRestService.initializeHeaderGetData(auth['token-auth'])
        );
    }

    public getLicenseById(id): Observable<any> {
      let auth = this.authServices.Auth();
      let data = {
          platform: 'Website',
          id: id,
      };

      return this.http.post(
          this.configuration.api.url + '/api/license/get-by-id',
          this.globalRestService.initializeBody(
              data,
              'api/license/get-by-id'
          ),
          this.globalRestService.initializeHeaderGetData(auth['token-auth'])
      );
  }

  public updateLicense(id, request): Observable<any> {
    let auth = this.authServices.Auth();
    request.id = id;
    return this.http.post(
        this.configuration.api.url + '/api/license/update',
        this.globalRestService.initializeBody(
            request,
            'api/license/update'
        ),
        this.globalRestService.initializeHeaderGetData(auth['token-auth'])
    );
}

}
