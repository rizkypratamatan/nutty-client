import {TableRequest} from './table-request';
import {TableSearchReference} from './table-search-reference';
import {TableOrderReference} from './table-order-reference';
import {TableColumnReference} from './table-column-reference';


export class PersonalTableRequest extends TableRequest {

    public authentication: string;


    constructor(timestamp: string, token: string, columns: TableColumnReference[], length: number, order: TableOrderReference[], search: TableSearchReference, start: number, authentication: string) {

        super(timestamp, token, columns, length, order, search, start);
        this.authentication = authentication;

    }

}
