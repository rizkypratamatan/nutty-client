import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageTemplateService } from 'src/app/services/message-templates/message-template.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-message-template',
    templateUrl: './message-template.component.html',
    styleUrls: ['./message-template.component.scss'],
})
export class MessageTemplateComponent implements OnInit {
    allMessage: any[] = [];
    allType: any[] = [];
    allGroup: any[] = [];
    allRole: any[] = [];
    allStatus: any[] = [];
    loading: boolean = false;

    fields = {
        name: '',
        format: '',
    };

    filter = {};
    p: number = 1;
    totalMessage: number;

    typeFilter = ['Administrator', 'CRM', 'Telemarketer'];
    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        // Object.keys(this.fields).forEach((key) =>
        //     this.fields[key] === '' ? delete this.fields[key] : key
        // );
        // this.filter = Object.assign({}, this.fields);
        this.getPage(1);
    }

    constructor(private service: MessageTemplateService, private router: Router) {}

    ngOnInit(): void {
        this.getPage(1);

        // this.userGroupService.getAllGroup({}, 1).subscribe((response) => {
        //     this.allGroup = response['dataUser'];
        // });
        // this.userRoleService.getAllRole({}, 1).subscribe((response) => {
        //     this.allRole = response['data'];
        // });
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllMessageTemplate(this.fields, page).subscribe((response) => {
        //   console.log(response['data']);
            this.allMessage = response['data'];
            this.allType = this.typeFilter;
            this.p = page;
            // this.allStatus = this.statusFilter;
            this.totalMessage = response['total_data'];
            this.loading = false;
        });
    }

    create() {
        this.router.navigate(['/message/add-edit']);
    }

    edit(id) {
        this.router.navigate(['/message/add-edit/' + id]);
    }

    delete(id, name) {
        const currentUrl = this.router.url;
        // console.log(currentUrl);

        let data = {
            platform: 'Website',
            id: id.$oid,
        };

        if (confirm('Are you sure to delete message: ' + name)) {
            this.service.deleteTemplate(data).subscribe((response) => {
                // console.log(response);
                if (response.result === true) {
                    this.getPage(1)
                    Swal.fire({
                      title: 'Success!',
                      text: response['response'],
                      icon: 'success',
                      confirmButtonText: 'Close'
                    });
                  }else{
                    Swal.fire({
                      title: 'Error!',
                      text: response['response'],
                      icon: 'error',
                      confirmButtonText: 'Close'
                    });
                  }
            });
        }
    }
}
