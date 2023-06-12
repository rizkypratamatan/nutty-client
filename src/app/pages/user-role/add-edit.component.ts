import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/user/user-role.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditRoleComponent implements OnInit {
    id: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];
    data: any;
    privileges = {
        "database" : "0000",
        "report" : "0000",
        "setting" : "0000",
        "settingApi" : "0000",
        "user" : "0000",
        "userGroup" : "0000",
        "userRole" : "0000",
        "website" : "0000",
        "worksheet" : "0000",
        "whatsapp" : "0000",
        "sms" : "0000",
        "email" : "0000"
    };

    // prv_value = [
    //     { name: 'View', value: 0 },
    //     { name: 'Add', value: 7 },
    //     { name: 'Edit', value: 7 },
    //     { name: 'Delete', value: 7 },
    // ];

    // view, add, edit, delete
    

    privilege_list = [
        { 
            name: 'database',
            permission : "0000",
        },
        { 
            name: 'report',
            permission : "0000",
         },
        { 
            name: 'setting',
            permission : "0000",
        },
        { 
            name: 'settingApi',
            permission : "0000",
        },
        { 
            name: 'user',
            permission : "0000",
         },
        { 
            name: 'userGroup',
            permission : "0000",
        },
        { 
            name: 'userRole',
            permission : "0000"
        },
        { 
            name: 'website',
            permission : "0000"
        },
        { 
            name: 'worksheet',
            permission : "0000"
         },
        { 
            name: 'whatsapp',
            permission : "0000"
        },
        { 
            name: 'sms',
            permission : "0000",
        },
        { 
            name: 'email',
            permission : "0000",
        },
    ];

    fields = {
        platform: 'Website',
        description: '',
        name: '',
        nucode: '',
        privileges: this.privileges,
        status: '',
    };
    
    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private userRoleService: UserRoleService,
        ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        // this.userRoleService.getRoleById(this.id).subscribe((response) => {
        //     console.log(response)
        //     this.data = response.data
        // });
    }

    submit() {
        if (this.isAddMode) {
            this.create();
        } else {
            this.update();
        }
    }

    private update(){

    }

    private create(){
        
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


}
