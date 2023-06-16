import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditGroupComponent implements OnInit {
    website: any;
    selectedWebsite: any[] = [];

    id: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];

    fields = {
        platform: 'Website',
        description: '',
        name: '',
        status: '',
        website: {},
        nucode: '',
    };

    constructor(
        private service: UserGroupService,
        private router: Router,
        private route: ActivatedRoute,
        private serviceWebsite: WebsiteService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        // this.website = {};

        this.serviceWebsite.getAllWebsite().subscribe((response) => {
            console.log(response.data);
            this.website = response.data;
        });

        if (!this.isAddMode) {
            this.service.getGroupById(this.id).subscribe((response) => {
                // this.website = {
                //     _id: response.dataUser.website['ids'][0],
                //     name: response.dataUser.website['names'][0],
                // };
                // console.log(response);

                this.fields = {
                    platform: 'Website',
                    description: response.dataUser.description,
                    name: response.dataUser.name,
                    status: response.dataUser.status,
                    website: {},
                    nucode: response.dataUser.nucode,
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

    populateWebsite(id: any, checked: boolean){
        if(checked){
            this.selectedWebsite.push(id);
        }else{
            if(this.selectedWebsite.length == 1){
                this.selectedWebsite.pop()
            }else{
                let position = this.selectedWebsite.indexOf(id);
                if ( position ) this.selectedWebsite.splice(position, 1);
            }
            
        }
        console.log(this.selectedWebsite)
    }

    private create() {
        this.fields = {
            platform: 'Website',
            description: this.fields['description'],
            name: this.fields['name'],
            status: this.fields['status'],
            website: {},
            nucode: this.fields['nucode'],
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
