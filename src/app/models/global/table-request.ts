import {BaseRequest} from './base-request';
import {TableColumnReference} from './table-column-reference';
import {TableOrderReference} from './table-order-reference';
import {TableSearchReference} from './table-search-reference';


export class TableRequest extends BaseRequest {

    public columns: TableColumnReference[];

    public length: number;

    public order: TableOrderReference[];

    public search: TableSearchReference;

    public start: number;


    constructor(timestamp: string, token: string, columns: TableColumnReference[], length: number, order: TableOrderReference[], search: TableSearchReference, start: number) {

        super(timestamp, token);
        this.columns = columns;
        this.length = length;
        this.order = order;
        this.search = search;
        this.start = start;

    }

}
