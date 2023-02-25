import {TimestampReference} from './timestamp-reference';


export class Base {

    public id: string;

    public created: TimestampReference;

    public modified: TimestampReference;


    constructor(id: string, created: TimestampReference, modified: TimestampReference) {

        this.id = id;
        this.created = created;
        this.modified = modified;

    }

}
