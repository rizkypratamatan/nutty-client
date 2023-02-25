import {Injectable} from '@angular/core';
import {BaseResponse} from '../../models/global/base-response';
import Swal from 'sweetalert2';
import {EncryptionService} from './encryption.service';
import {Router} from '@angular/router';


@Injectable()
export class DataService {

    constructor(private router: Router, private encryptionService: EncryptionService) {
    }


    public alert(icon: string, text: string) {

        const option: any = {
            html: '<span class="response-alert">' + text + '</span>',
            icon,
            position: 'top-end',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            showCloseButton: true,
            showConfirmButton: false,
            timer: 5000
        };
        Swal.fire(option);

    }


    public checkAccount(): void {

        const account = null;//this.initializeAccount();

        if(account == null) {

            this.router.navigate(['/login']).then();

        }

    }


    public checkDate(date: Date) {

        let result: boolean;

        if(date != null) {

            result = true;

        } else {

            result = true;

        }

        return result;

    }


    public checkEmail(text: string) {

        let result = false;

        if(text != '') {

            if(text.match(/^([0-9A-Za-z_\-\.]){1,}\@([0-9A-Za-z_\-\.]){1,}\.([A-Za-z]){2,}$/)) {

                result = true;

            }

        } else {

            result = true;

        }

        return result;

    }


    public checkEmailRequired(text: string) {

        let result = false;

        if(text != '') {

            result = this.checkEmail(text);

        }

        return result;

    }


    public checkLength(text: string, min: number, max: number): boolean {

        let result = false;

        if(text != '') {

            if(text.length >= min && (text.length <= max || max == 0)) {

                result = true;

            }

        } else {

            result = true;

        }

        return result;

    }


    public checkLengthRequired(text: string, min: number, max: number): boolean {

        let result = false;

        if(text != '') {

            result = this.checkLength(text, min, max);

        }

        return result;

    }


    public checkNumber(decimal: boolean, number: number): boolean {

        let result = false;

        const string = number.toString();

        if(string != '') {

            if(decimal && string.match(/^[0-9,.]+$/)) {

                result = true;

            } else if(!decimal && (string.match(/^[0-9,]+$/) || string.match(/^[0-9]+$/))) {

                result = true;

            }

        }

        return result;

    }


    public checkPassword(text: string): BaseResponse {

        const result: BaseResponse = new BaseResponse(
            'Failed to check password',
            false
        );

        if(text.length < 3) {

            result.response = 'Please input more than 2 characters';
            result.result = false;

        } else if(/[a-z]/.test(text) && /[A-Z]/.test(text) && /[0-9]/.test(text) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) {

            result.response = 'Strong password';
            result.result = true;

        } else if((/[A-Z]/.test(text) && /[0-9]/.test(text) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) || (/[a-z]/.test(text) && /[0-9]/.test(text) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) || (/[a-z]/.test(text) && /[A-Z]/.test(text) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) || (/[a-z]/.test(text) && /[A-Z]/.test(text) && /[0-9]/.test(text))) {

            result.response = 'Secure password';
            result.result = true;

        } else if((/[0-9]/.test(text) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) || (/[A-Z]/.test(text) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) || (/[A-Z]/.test(text) && /[0-9]/.test(text)) || (/[a-z]/.test(text) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) || (/[a-z]/.test(text) && /[0-9]/.test(text)) || (/[a-z]/.test(text) && /[A-Z]/.test(text))) {

            result.response = 'Medium security password';
            result.result = true;

        } else if((/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(text)) || (/[0-9]/.test(text)) || (/[A-Z]/.test(text)) || (/[a-z]/.test(text))) {

            result.response = 'Low security password';
            result.result = true;

        }

        return result;

    }


    public checkPasswordConfirm(password: string, text: string): boolean {

        let result = false;

        if(password == text) {

            result = true;

        }

        return result;

    }


    public checkSelectMultipleRequired(array: string[]): boolean {

        let result = false;

        array.forEach((value: string) => {

            if(value != null) {

                if(value != '') {

                    result = true;

                }

            }

        });

        return result;

    }


    public checkSelectRequired(text: string): boolean {

        let result = false;

        if(text != null) {

            if(text != '') {

                result = true;

            }

        }

        return result;

    }


    public checkUsername(text: string, min: number, max: number): boolean {

        let result = false;

        if(/[a-z]/.test(text)) {

            result = this.checkLengthRequired(text, min, max);

        }

        return result;

    }


    /*public initializeAccount(): User {

        let result = null;

        if(localStorage.getItem('nu-account') != null) {

            result = JSON.parse(this.encryptionService.aesDecrypt(localStorage.getItem('nu-account')));

        }

        return result;

    }*/

}
