import { Component, OnInit } from '@angular/core';
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
        if (this.isAddMode) {
            this.create();
        } else {
            this.update();
        }
    }

    private create() {
        this.fields = {
            platform: 'Website',
            timestamp: this.fields['timestamp'],
            token: this.fields['token'],
            description: this.fields['description'],
            name: this.fields['name'],
            nucode: this.fields['nucode'],
            status: this.fields['status'],
            sync: this.fields['sync'],
        };

        this.service.addWebsite(this.fields).subscribe((response) => {
            if (response.result === true) {
                this.router.navigate(['/website']);
            }
        });
    }

    private update() {
        let id = this.id;

        this.service.updateWebsite(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.router.navigate(['/website']);
            }
        });
    }
}
