import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { LicenseService } from 'src/app/services/license/license.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditLicenseComponent implements OnInit {
    id: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];
    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;
    loadingSync: boolean = false;
    response: any;

    name: any = '';
    nucode: any = '';
    // seat: any = '';
    // status: any = '';

    fields = {
        platform: 'Website',
        nucode: '',
        seat: '',
        status: '',
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: LicenseService,
        private helper: HelperService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.service.getLicenseById(this.id).subscribe((response) => {
                this.response = response['data'];
                this.name = response['data'].name;
                this.fields.nucode = response['data'].nucode;
                this.fields.seat = response['data'].seat;
                this.fields.status = response['data'].status;
            });
        }
    }

    submit() {
        this.errorMsg = [];
        this.validateInput();
        if (this.isValid) {
            this.loadingIndicator = true;
            if (this.isAddMode) {
                this.create();
            } else {
                this.update();
            }
        }
    }

    validateInput() {
        this.isValid = true;
        if (!this.fields.nucode) {
            this.isValid = false;
            this.errorMsg.push();
        }
        
    }

    private create(){
      console.log("create")
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
