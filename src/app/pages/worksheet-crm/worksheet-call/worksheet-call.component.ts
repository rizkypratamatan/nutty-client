import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/global/auth.service';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-worksheet-call',
  templateUrl: './worksheet-call.component.html',
  styleUrls: ['./worksheet-call.component.scss']
})
export class WorksheetCallComponent implements OnInit {

    id: string;
    websiteId: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];
    isValid: boolean =  true;
    errorMsg: any[] = [];
    loadingIndicator : boolean = false;
    skype: any;
    whatsapp: any;

    fields = {
        name: '',
        account: {
          username: ''
        },
        log: {
          id: ''
        },
        status:'',
        reference: '',
        websiteId: '',
        group: ''
    };
    auth: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: WorksheetService,
        private authService: AuthService
    ) {
        this.auth = this.authService.Auth();
    }

    ngOnInit(): void {
        this.auth = this.authService.Auth();
        this.id = this.route.snapshot.params['id'];
        this.websiteId = this.route.snapshot.params['websiteId'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.service.worksheetCall(this.id, this.websiteId).subscribe((response) => {
              console.log(response)
              this.skype = response.database.contact.phone.replace("+", "");
              this.whatsapp = response.database.contact.whatsapp.replace("+", "");
              this.fields.name = response.database.name;
              this.fields.account.username = response.databaseAccount.username;
              this.fields.group = response.database.group.name;
              this.fields.log.id = response.databaseLog._id;
              this.fields.status = response.database.status;
              this.fields.reference = response.database.reference;
              this.fields.websiteId = this.websiteId;
            });
        }
    }

    submit() {
        this.errorMsg = [];
        this.validateInput();
        if(this.isValid){
            this.loadingIndicator = true
            this.update();
        }
        
    }

    validateInput(){
        this.isValid = true;
    }

    private update() {
        this.service.updateDatabase(this.id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
            }
        });
    }

}
