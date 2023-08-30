import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { WebsiteService } from 'src/app/services/website/website.service';
import { AuthService } from 'src/app/services/global/auth.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditGroupComponent implements OnInit {
    website: any;
    selectedWebsite: any[] = [];
    isValid: boolean =  true;
    errorMsg: any[] = [];
    loadingIndicator : boolean = false;

    id: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];

    fields = {
        platform: 'Website',
        description: '',
        name: '',
        status: '',
        websites: this.selectedWebsite,
        nucode: 'system',
    };
    auth: any;

    constructor(
        private service: UserGroupService,
        private router: Router,
        private route: ActivatedRoute,
        private serviceWebsite: WebsiteService,
        private authService : AuthService
    ) {
        this.auth = this.authService.Auth();
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.selectedWebsite = [];
        this.isAddMode = !this.id;

        this.serviceWebsite.getAllWebsite({}, 1).subscribe((response) => {
            this.website = response.data;
        });

        if (!this.isAddMode) {
            
            this.service.getGroupById(this.id).subscribe((response) => {
                let dataWebsite = []; 
                response['dataUser'].website.ids.forEach(function(item){  
                    dataWebsite.push(item)
                });

                this.selectedWebsite = dataWebsite

                this.fields = {
                    platform: 'Website',
                    description: response['dataUser'].description,
                    name: response['dataUser'].name,
                    status: response['dataUser'].status,
                    websites: this.selectedWebsite,
                    nucode: response['dataUser'].nucode,
                };
            });
        }else{
            this.fields.nucode = this.auth.nucode;
        }
    }

    submit() {
        this.errorMsg = [];
        this.validateInput();
        if(this.isValid){
            this.loadingIndicator = true;
            if (this.isAddMode) {
                this.create();
            } else {
                this.update();
            }
        }
    }

    validateInput(){
        this.isValid = true;
        if(!this.fields.description){
            this.isValid = false;
            this.errorMsg.push("Description is Required");
        }
        if(!this.fields.name){
            this.isValid = false;
            this.errorMsg.push("Name is Required");
        }
        if(!this.fields.status){
            this.isValid = false;
            this.errorMsg.push("Status is Required");
        }
        if(this.selectedWebsite.length < 1){
            this.isValid = false;
            this.errorMsg.push("Please select at least 1 website");
        }
        if(!this.fields.nucode){
            this.isValid = false;
            this.errorMsg.push("Nucode is Required");
        }
    }

    populateWebsite(id: any, checked: boolean){
        if(checked){
            this.selectedWebsite.push(id);
        }else{
            if(this.selectedWebsite.length == 1){
                this.selectedWebsite.pop()
            }else{
                let position = this.selectedWebsite.indexOf(id);
                    if ( position ) this.selectedWebsite.splice(position, 1);
            }
            
        }
    }

    private create() {
        this.fields = {
            platform: 'Website',
            description: this.fields['description'],
            name: this.fields['name'],
            status: this.fields['status'],
            websites: this.selectedWebsite,
            nucode: this.fields['nucode'],
        };

        this.service.addGroup(this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false;
                Swal.fire({
                    title: 'Success!',
                    text: 'Add Group Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/user/group']);
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: response.response,
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        });
    }

    private update() {
        let id = this.id;

        this.service.updateGroup(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false;
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/user/group']);
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: response.response,
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        });
    }
}
