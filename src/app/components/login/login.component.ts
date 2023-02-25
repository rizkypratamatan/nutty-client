import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../../configurations/configuration.service";
import {UserLogService} from "../../services/user/user-log.service";
import {UserLoginResponse} from "../../models/user/user-login-response";
import {EncryptionService} from "../../services/global/encryption.service";
import {DataService} from "../../services/global/data.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public configuration: ConfigurationService;

    public response: string;

    public submit: boolean;

    public year: number = new Date().getFullYear();


    constructor(private configurationService: ConfigurationService, private dataService: DataService, private encryptionService: EncryptionService, private userLogService: UserLogService) {

        this.configuration = this.configurationService;

    }


    ngOnInit(): void {
    }


    public login() {

        this.submit = true;

        this.userLogService.login(null, null).subscribe((response: UserLoginResponse) => {

            if(response.result) {

                localStorage.setItem('nu-account', this.encryptionService.aesEncrypt(JSON.stringify(response.account)));
                localStorage.setItem('nu-authentication', this.encryptionService.aesEncrypt(response.authentication));

                this.dataService.alert('success', response.response);

                window.location.href = '/';

            } else {

                this.dataService.alert('error', response.response);

            }

        });

    }

}
