import {Injectable} from '@angular/core';
import * as forge from 'node-forge';
import {AES, enc} from 'crypto-ts';
import {ConfigurationService} from '../../configurations/configuration.service';


@Injectable()
export class EncryptionService {

    public configuration: ConfigurationService;


    constructor(private configurationService: ConfigurationService) {

        this.configuration = this.configurationService;

    }


    public aesEncrypt(text: string): string {

        return AES.encrypt(text, this.configuration.encryption.secretKey).toString();

    }


    public aesDecrypt(text: string): string {

        return AES.decrypt(text, this.configuration.encryption.secretKey).toString(enc.Utf8);

    }


    public rsaDecrypt(text: string): string {

        const rsa = forge.pki.privateKeyFromPem(this.configuration.encryption.privateKey);
        const raw = forge.util.decode64(text);

        return rsa.decrypt(raw);

    }


    public rsaEncrypt(text: string): string {

        const rsa = forge.pki.publicKeyFromPem(this.configuration.encryption.publicKey);
        const raw = rsa.encrypt(text);

        return window.btoa(raw);

    }

}
