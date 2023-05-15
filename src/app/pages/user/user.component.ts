import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    allUsers: any;

    constructor(private service: UserService) {}

    ngOnInit(): void {
        this.service.getAllUser().subscribe((response) => {
            this.allUsers = response['dataUser'];
        });
    }

    public userLists: string[] = [];
}
