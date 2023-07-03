import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';
import { EncryptionService } from './encryption.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(private encryptionService: EncryptionService) {}

    public Auth() {
        this.accountData = localStorage.getItem('nu-account');
        this.auth = JSON.parse(
            this.encryptionService.aesDecrypt(this.accountData)
        );

        return this.auth;
    }

    public AuthPermission() {
        // let auth = this.Auth();
        // let authPermissions = {};

        // let privilege = {
        //     database: '0000',
        //     report: '0000',
        //     setting: '0000',
        //     settingApi: '0000',
        //     user: '0000',
        //     userGroup: '0000',
        //     userRole: '0000',
        //     website: '0000',
        //     worksheet: '0000',
        //     tools: '0000',
        //     worksheetCrm: '0000',
        // };

        // if (auth['role'] != 'System') {
        //     //
        // } else {
        //     privilege = {
        //         database: '7777',
        //         report: '7777',
        //         setting: '7777',
        //         settingApi: '7777',
        //         user: '7777',
        //         userGroup: '7777',
        //         userRole: '7777',
        //         website: '7777',
        //         worksheet: '7777',
        //         tools: '7777',
        //         worksheetCrm: '7777',
        //     };

        //     authPermissions = privilege;
        // }

        // return authPermissions;
    }
}
