import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageTemplateService } from 'src/app/services/message-templates/message-template.service';
import Swal from 'sweetalert2';
import { HelperService } from 'src/app/services/helper.service';
import { timestamp } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditMessageTemplateComponent implements OnInit {
    website: any;
    selectedWebsite: any[] = [];
    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;

    id: string;
    isAddMode: boolean;
    isSubmit: boolean = false;
    status = ['Active', 'Inactive'];

    fields = {
        name: '',
        type: '',
        format: '',
    };

    public Editor = ClassicEditor;

    constructor(
        private service: MessageTemplateService,
        private router: Router,
        private route: ActivatedRoute,
        private helper: HelperService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.service.getMessageById(this.id).subscribe((response) => {

                this.fields = {
                    name: response.data.name,
                    type: response.data.type,
                    format: response.data.format,
                };
            });
        }
    }
    submit() {
        this.errorMsg = [];
        this.isSubmit = true;
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
        if (!this.fields.name) {
            this.isValid = false;
            this.errorMsg.push('Name is Required');
        }
        if (!this.fields.type) {
            this.isValid = false;
            this.errorMsg.push('Type is Required');
        }
        if (!this.fields.format) {
            this.isValid = false;
            this.errorMsg.push('Format is Required');
        }
    }

    private create() {
        this.fields = {
            name: this.fields['name'],
            type: this.fields['type'],
            format: this.fields['format'],
        };

        this.service.addMessage(this.fields).subscribe((response) => {
            if (response.result === true) {
                this.isSubmit = false;
                this.formReset();
                Swal.fire({
                    title: 'Success!',
                    text: 'Success',
                    icon: 'success',
                    confirmButtonText: 'Close',
                });
                this.router.navigate(['/message/list']);
                this.loadingIndicator = false;
            }
        });
    }

    private update() {
        let id = this.id;
        this.service.updateTemplate(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false;
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/message/list']);
                this.loadingIndicator = false;
            }
        });
    }

    formReset() {
        this.fields = {
            name: '',
            type: '',
            format: '',
        };
    }

    initializeTimestamp(timestamp){
        return this.helper.initializeTimestamp(timestamp);
    }
}
