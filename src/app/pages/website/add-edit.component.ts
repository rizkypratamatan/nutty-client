import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditWebsiteComponent implements OnInit {
    id: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];
    isValid: boolean =  true;
    errorMsg: any[] = [];
    loadingIndicator : boolean = false;

    fields = {
        platform: 'Website',
        timestamp: '',
        token: '',
        description: '',
        name: '',
        nucode: '',
        status: '',
        sync: '',
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: WebsiteService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.service.getWebsiteById(this.id).subscribe((response) => {
                this.fields = {
                    platform: 'Website',
                    timestamp: response.data.timestamp,
                    token: response.data.token,
                    description: response.data.description,
                    name: response.data.name,
                    nucode: response.data.nucode,
                    status: response.data.status,
                    sync: response.data.sync,
                };
            });
        }
    }

    submit() {
        this.errorMsg = [];
        this.validateInput();
        if(this.isValid){
            this.loadingIndicator = true
            if (this.isAddMode) {
                this.create();
            } else {
                this.update();
            }
        }
        
    }

    validateInput(){
        this.isValid = true;
        if(!this.fields.name){
            this.isValid = false;
            this.errorMsg.push("Name is Required");
        }
        if(!this.fields.nucode){
            this.isValid = false;
            this.errorMsg.push("Nucode is Required");
        }
        if(!this.fields.description){
            this.isValid = false;
            this.errorMsg.push("Description is Required");
        }
        if(!this.fields.status){
            this.isValid = false;
            this.errorMsg.push("Status is Required");
        }
        
    }

    private create() {
        this.service.addWebsite(this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false
                Swal.fire({
                    title: 'Success!',
                    text: 'Add Website Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/website']);
            }
        });
    }

    private update() {
        let id = this.id;

        this.service.updateWebsite(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/website']);
            }
        });
    }
}
