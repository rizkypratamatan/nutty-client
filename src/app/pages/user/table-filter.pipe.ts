import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tableFilter',
})
export class UserTableFilterPipe implements PipeTransform {
    /**
     * Pipe filters the list of elements based on the search text provided
     *
     * @param items list of elements to search in
     * @param searchText search string
     * @returns list of elements filtered by search text or []
     */
    transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
        if (Object.keys(filter).length == 0) return items;
        // console.log(filter);

        let filterKeys = Object.keys(filter);

        return items.filter((item) => {
            return filterKeys.every((keyName) => {
                // console.log(keyName);
                return (
                    new RegExp(filter[keyName], 'gi').test(item[keyName]) ||
                    filter[keyName] === ''
                );
            });
        });
    }
}
