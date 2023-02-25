import {UserType} from '../../enums/user/user-type';
import {Base} from '../global/base';
import {Gender} from '../../enums/global/gender';
import {Language} from '../../enums/global/language';
import {UserContactReference} from './user-contact-reference';
import {UserPasswordReference} from './user-password-reference';
import {UserNameReference} from './user-name-reference';
import {TimestampReference} from '../global/timestamp-reference';
import {UserStatus} from '../../enums/user/user-status';


export class User extends Base {

    public avatar: string;

    public contact: UserContactReference;

    public gender: Gender;

    public language: Language;

    public name: UserNameReference;

    public password: UserPasswordReference;

    public reference: string;

    public status: UserStatus;

    public types: UserType[];

    public username: string;


    constructor(id: string, created: TimestampReference, modified: TimestampReference, avatar: string, contact: UserContactReference, gender: Gender, language: Language, name: UserNameReference, password: UserPasswordReference, reference: string, status: UserStatus, types: UserType[], username: string) {

        super(id, created, modified);
        this.avatar = avatar;
        this.contact = contact;
        this.gender = gender;
        this.language = language;
        this.name = name;
        this.password = password;
        this.reference = reference;
        this.status = status;
        this.types = types;
        this.username = username;

    }

}
