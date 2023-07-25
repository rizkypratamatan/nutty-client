import {Injectable} from '@angular/core';
import {EncryptionService} from './encryption.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfigurationService} from '../../configurations/configuration.service';
import { identity } from 'rxjs';


@Injectable()
export class RestService {

    public configuration: ConfigurationService;


    constructor(private configurationService: ConfigurationService, private encryptionService: EncryptionService) {

        this.configuration = this.configurationService;

    }


    public initializeOption(): object {

        const result = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'nu-key': this.configuration.api.key,
            })
        };

        return result;

    }

    public initializeHeaderGetData(token: string): any {
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

    public initializeHeaderMultipartData(token: string): any {
        const header = {
            headers: new HttpHeaders({
                Accept: 'application/json',
                'nu-key': this.configuration.api.key,
                'token-auth': token,
            }),
        };

        header.headers.delete("Content-Type");
        header.headers.set("Content-Type", undefined);

        return header;
    }

    public initializeBody(data: any, path: string): any {

        const date: Date = new Date();
        data.timestamp = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + 'T' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + this.initializeTimezone(date);
        data.token = this.encryptionService.rsaEncrypt(path + ',' + data.timestamp);

        return data;

    }


    private initializeTimezone(date: Date): string {

        let result = '';

        const offset: number = Math.abs(date.getTimezoneOffset() / 60);

        if(date.getTimezoneOffset() < 0) {

            result = '+' + ('0' + offset).slice(-2) + '00';

        } else {

            result = '-' + ('0' + offset).slice(-2) + '00';

        }

        return result;

    }

}
