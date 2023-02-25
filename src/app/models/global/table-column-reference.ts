import {TableSearchReference} from './table-search-reference';


export class TableColumnReference {

    public data: string;

    public name: string;

    public search: TableSearchReference;


    constructor(data: string, name: string, search: TableSearchReference) {

        this.data = data;
        this.name = name;
        this.search = search;

    }

}
