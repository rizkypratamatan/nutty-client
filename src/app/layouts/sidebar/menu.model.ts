export interface MenuItem {
    id?: number;
    label?: string;
    name?: string;
    icon?: string;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
    permission?: number;
}
