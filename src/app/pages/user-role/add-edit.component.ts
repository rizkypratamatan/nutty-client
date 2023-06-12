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

    private create() {
        this.fields = {
            platform: 'Website',
            description: this.fields['description'],
            name: this.fields['name'],
            nucode: this.fields['nucode'],
            privileges: this.privileges,
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

    updatePrivilege(key: any, index: any, value: any){
        let priv = this.privileges[key].split('');
        priv[index] = value;
        this.privileges[key] = priv.join("");
    }
}
