export class TableSearchReference {

    public objectId: boolean;

    public regex: boolean;

    public value: string;


    constructor(objectId: boolean, regex: boolean, value: string) {

        this.objectId = objectId;
        this.regex = regex;
        this.value = value;

    }

}
