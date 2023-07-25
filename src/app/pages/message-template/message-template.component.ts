import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageTemplateService } from 'src/app/services/message-templates/message-template.service';
import Swal from 'sweetalert2';
import { HelperService } from 'src/app/services/helper.service';
import { timestamp } from 'rxjs/operators';

@Component({
    selector: 'app-message-template',
    templateUrl: './message-template.component.html',
    styleUrls: ['./message-template.component.scss'],
})
export class MessageTemplateComponent implements OnInit {
    allMessage: any[] = [];
    allType: any[] = [];
    loading: boolean = false;

    fields = {
        name: '',
        type: '',
        format: '',
    };

    filter = {};
    p: number = 1;
    totalMessage: number;

    typeFilter = ['Sms', 'WA', 'Email'];

    updateFilters() {
        this.getPage(1);
    }

    constructor(private service: MessageTemplateService, 
        private router: Router,
        private helper: HelperService) {}

    ngOnInit(): void {
        this.getPage(1);
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllMessageTemplate(this.fields, page).subscribe((response) => {
            this.allMessage = response['data'];
            this.allType = this.typeFilter;
            this.p = page;
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

        let data = {
            platform: 'Website',
            id: id,
        };

        if (confirm('Are you sure to delete message: ' + name)) {
            this.service.deleteTemplate(data).subscribe((response) => {
                if (response.result === true) {
                    Swal.fire({
                      title: 'Success!',
                      text: response['response'],
                      icon: 'success',
                      confirmButtonText: 'Close'
                    });
                    this.getPage(1)
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

    initializeTimestamp(timestamp){
        return this.helper.initializeTimestamp(timestamp)
    }
}
