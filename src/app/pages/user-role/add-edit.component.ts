import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditRoleComponent implements OnInit {
    id: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];
    privilege = [];

    prv_value = [
        { name: 'View', value: 7 },
        { name: 'Add', value: 7 },
        { name: 'Edit', value: 7 },
        { name: 'Delete', value: 7 },
    ];

    // view, add, edit, delete

    privilege_list = [
        { name: 'database' },
        { name: 'report' },
        { name: 'setting' },
        { name: 'settingApi' },
        { name: 'user' },
        { name: 'userGroup' },
        { name: 'userRole' },
        { name: 'website' },
        { name: 'worksheet' },
        { name: 'whatsapp' },
        { name: 'sms' },
        { name: 'email' },
    ];

    fields = {
        platform: 'Website',
        description: '',
        name: '',
        nucode: '',
        privilege: this.privilege,
        status: '',
    };

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
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
            description: this.fields['description'],
            name: this.fields['name'],
            nucode: this.fields['nucode'],
            privilege: this.privilege,
            status: this.fields['status'],
        };

        console.log(this.fields);

        // this.service.addGroup(this.fields).subscribe((response) => {
        //     if (response.result === true) {
        //         this.router.navigate(['/user/group']);
        //     }
        // });
    }

    private update() {
        let id = this.id;

        console.log(this.fields);
        // this.service.updateGroup(id, this.fields).subscribe((response) => {
        //     if (response.result === true) {
        //         this.router.navigate(['/user/group']);
        //     }
        // });
    }
}
