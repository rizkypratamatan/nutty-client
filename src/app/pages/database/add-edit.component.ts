import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditDatabaseComponent implements OnInit {
    allGroup: any[] = [];

    filteredGroup: any;
    group: any = '';
    status = ['Active', 'Inactive'];

    id: string;
    isAddMode: boolean;

    fields = {
        city: '',
        contact: {
            email: '',
            line: '',
            michat: '',
            phone: '',
            telegram: '',
            wechat: '',
            whatsapp: '',
        },
        country: '',
        crm: {
            // _id: '0',
            // avatar: '',
            // name: 'System',
            // username: 'system',
        },
        gender: '',
        group: {
            // _id: '0',
            // name: 'System',
        },
        import: {
            // _id: '0',
            // file: '',
        },
        language: '',
        name: '',
        reference: '',
        state: '',
        status: '',
        street: '',
        telemarketer: {
            // _id: '0',
            // avatar: '',
            // name: 'System',
            // username: 'system',
        },
        zip: '',
    };

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.fields = {
                city: '',
                contact: {
                    email: '',
                    line: '',
                    michat: '',
                    phone: '',
                    telegram: '',
                    wechat: '',
                    whatsapp: '',
                },
                country: '',
                crm: {},
                gender: '',
                group: {},
                import: {},
                language: '',
                name: '',
                reference: '',
                state: '',
                status: '',
                street: '',
                telemarketer: {},
                zip: '',
            };
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
        // this.fields = {
        //     username: this.fields['username'],
        //     name: this.fields['name'],
        //     password: this.fields['password'],
        //     nucode: this.fields['nucode'],
        //     type: this.fields['type'],
        //     role: this.role,
        //     group: this.group,
        //     status: this.fields['status'],
        //     platform: 'Website',
        //     gender: this.fields['gender'] ? this.fields['gender'] : '',
        //     contact: {
        //         email: this.fields['email'] ? this.fields['email'] : '',
        //         fax: this.fields['fax'] ? this.fields['fax'] : '',
        //         line: this.fields['line'] ? this.fields['line'] : '',
        //         michat: this.fields['michat'] ? this.fields['michat'] : '',
        //         phone: this.fields['phone'] ? this.fields['phone'] : '',
        //         wechat: this.fields['wechat'] ? this.fields['wechat'] : '',
        //         whatsapp: this.fields['whatsapp']
        //             ? this.fields['whatsapp']
        //             : '',
        //         telegram: this.fields['telegram']
        //             ? this.fields['telegram']
        //             : '',
        //     },
        //     country: this.fields['country'] ? this.fields['country'] : '',
        //     city: this.fields['city'] ? this.fields['city'] : '',
        //     street: this.fields['street'] ? this.fields['street'] : '',
        //     zip: this.fields['zip'] ? this.fields['zip'] : '',
        // };
        // this.userService.addUser(this.fields).subscribe((response) => {
        //     if (response.result === true) {
        //         this.router.navigate(['/user']);
        //     }
        // });
    }

    private update() {
        let id = this.id;
        // this.userService.updateUser(id, this.fields).subscribe((response) => {
        //     if (response.result === true) {
        //         this.router.navigate(['/user']);
        //     }
        // });
    }

    onOptionsSelectedGroup() {
        // console.log(this.group);

        if (this.group !== null && this.group !== undefined) {
            this.filteredGroup = this.allGroup.filter((t) => t == this.group);

            if (
                this.filteredGroup !== undefined &&
                this.filteredGroup !== null &&
                this.filteredGroup.length !== 0
            ) {
                this.group = {
                    _id: this.filteredGroup[0]._id,
                    name: this.filteredGroup[0].name,
                };
            }
        }
    }
}
