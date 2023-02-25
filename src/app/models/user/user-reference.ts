import {UserNameReference} from './user-name-reference';


export class UserReference {

    public avatar: string;

    public id: string;

    public name: UserNameReference;

    public username: string;


    constructor(avatar: string, id: string, name: UserNameReference, username: string) {

        this.avatar = avatar;
        this.id = id;
        this.name = name;
        this.username = username;

    }

}
