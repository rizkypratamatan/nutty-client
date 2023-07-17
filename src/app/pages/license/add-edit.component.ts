import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseService } from 'src/app/services/license/license.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditLicenseComponent implements OnInit {
    id: string;
    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;

    fields = {
        platform: 'Website',
        nucode: '',
        user: {
            total: ""
        },
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: LicenseService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.service.getLicenseById(this.id).subscribe((response) => {
            if(response.status){
                this.fields.nucode = response['data'].nucode;
                this.fields.user.total = response['data'].user.total;
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: response.response,
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
                // this.router.navigate(['/license']);
            }
            
        });
    }

    submit() {
        this.errorMsg = [];
        this.validateInput();
        if (this.isValid) {
            this.loadingIndicator = true;
            this.update();
        }
    }

    validateInput() {
        this.isValid = true;
        if (!this.fields.nucode) {
            this.isValid = false;
            this.errorMsg.push("Nucode Required");
        }

        if (!this.fields.user.total) {
            this.isValid = false;
            this.errorMsg.push("Seat Required");
        }
        
    }

    private update() {
        let id = this.id;
        this.service.updateLicense(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false;
                Swal.fire({
                    title: 'Success!',
                    text: response.response,
                    icon: 'success',
                    confirmButtonText: 'Close',
                });
            } else {
                this.loadingIndicator = false;
                Swal.fire({
                    title: 'Error!',
                    text: response.response,
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            }
        });
    }
}
