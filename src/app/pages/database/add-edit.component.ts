import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

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

    constructor(
        private route: ActivatedRoute,
        private service: DatabaseService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.service.getDatabaseById(this.id).subscribe((response) => {
                // console.log(response);

                this.fields = {
                    city: response.data.city,
                    contact: {
                        email: response.data.email,
                        line: response.data.line,
                        michat: response.data.michat,
                        phone: response.data.phone,
                        telegram: response.data.telegram,
                        wechat: response.data.wechat,
                        whatsapp: response.data.whatsapp,
                    },
                    country: response.data.country,
                    crm: {},
                    gender: response.data.gender,
                    group: {},
                    import: {},
                    language: response.data.language,
                    name: response.data.name,
                    reference: response.data.reference,
                    state: response.data.state,
                    status: response.data.status,
                    street: response.data.street,
                    telemarketer: {},
                    zip: response.data.zip,
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
            city: this.fields['city'],
            contact: {
                email: this.fields['email'],
                line: this.fields['line'],
                michat: this.fields['michat'],
                phone: this.fields['phone'],
                telegram: this.fields['telegram'],
                wechat: this.fields['wechat'],
                whatsapp: this.fields['whatsapp'],
            },
            country: this.fields['country'],
            crm: {},
            gender: this.fields['gender'],
            group: {},
            import: {},
            language: this.fields['language'],
            name: this.fields['name'],
            reference: this.fields['reference'],
            state: this.fields['state'],
            status: this.fields['status'],
            street: this.fields['street'],
            telemarketer: {},
            zip: this.fields['zip'],
        };

        this.service.addDatabase(this.fields).subscribe((response) => {
            if (response.result === true) {
                this.router.navigate(['/database']);
            }
        });
    }

    private update() {
        let id = this.id;
        console.log(this.fields);
        
        // this.service.updateDatabase(id, this.fields).subscribe((response) => {
          
        //     if (response.result === true) {
        //         this.router.navigate(['/database']);
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
