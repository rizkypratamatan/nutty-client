import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true,
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'uil-home-alt',
        badge: {
            variant: 'primary',
            text: '01', //'MENUITEMS.DASHBOARDS.BADGE',
        },
        link: '/dashboard',
    },
    {
        id: 3,
        isLayout: true,
    },
    {
        id: 4,
        label: 'MENUITEMS.USER.TEXT',
        isTitle: true,
    },
    {
        id: 5,
        label: 'MENUITEMS.USER.LIST.USER',
        icon: 'uil-user',
        subItems: [
            {
                id: 6,
                label: 'MENUITEMS.USER.LIST.LIST',
                link: '/user',
                parentId: 5,
            },
            {
                id: 7,
                label: 'MENUITEMS.USER.LIST.ADD',
                link: '/user/add-edit',
                parentId: 5,
            },
        ],
    },
    {
        id: 8,
        label: 'MENUITEMS.USER.LIST.ROLE',
        icon: 'uil-user-check',
        subItems: [
            {
                id: 9,
                label: 'MENUITEMS.USER.LIST.LIST',
                link: '/user/role',
                parentId: 8,
            },
            {
                id: 10,
                label: 'MENUITEMS.USER.LIST.ADD',
                link: '/user/role/add-edit',
                parentId: 8,
            },
        ],
    },
    {
        id: 11,
        label: 'MENUITEMS.USER.LIST.GROUP',
        icon: 'uil-users-alt',
        subItems: [
            {
                id: 12,
                label: 'MENUITEMS.USER.LIST.LIST',
                link: '/user/group',
                parentId: 11,
            },
            {
                id: 13,
                label: 'MENUITEMS.USER.LIST.ADD',
                link: '/user/group/add-edit',
                parentId: 11,
            },
        ],
    },
    {
        id: 14,
        label: 'MENUITEMS.WEBSITE.TEXT',
        isTitle: true,
    },
    {
        id: 15,
        label: 'MENUITEMS.WEBSITE.LIST.WEBSITE',
        icon: 'uil-globe',
        subItems: [
            {
                id: 16,
                label: 'MENUITEMS.WEBSITE.LIST.LIST',
                link: '/website',
                parentId: 15,
            },
            {
                id: 17,
                label: 'MENUITEMS.WEBSITE.LIST.ADD',
                link: '/website/add-edit',
                parentId: 15,
            },
        ],
    },
    {
        id: 18,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true,
    },
    {
        id: 19,
        label: 'MENUITEMS.APPS.LIST.WORKSHEET',
        icon: 'uil-outgoing-call',
        subItems: [
            {
                id: 20,
                label: 'MENUITEMS.APPS.LIST.NEW_DATA',
                link: '/worksheet',
                parentId: 19,
            },
            {
                id: 21,
                label: 'MENUITEMS.APPS.LIST.RESULT',
                link: '/worksheet/result',
                parentId: 19,
            },
        ],
    },
    {
        id: 22,
        label: 'MENUITEMS.DATABASE.TEXT',
        isTitle: true,
    },
    {
        id: 23,
        label: 'MENUITEMS.DATABASE.LIST.DATABASE',
        icon: 'uil-database',
        subItems: [
            {
                id: 24,
                label: 'MENUITEMS.DATABASE.LIST.LIST',
                link: '/database',
                parentId: 23,
            },
            {
                id: 25,
                label: 'MENUITEMS.DATABASE.LIST.IMPORT',
                parentId: 23,
                subItems: [
                    {
                        id: 26,
                        label: 'MENUITEMS.DATABASE.LIST.NEW_DATA',
                        link: '/database/import',
                        parentId: 25,
                    },
                    {
                        id: 27,
                        label: 'MENUITEMS.DATABASE.LIST.HISTORY',
                        link: '/database/history',
                        parentId: 25,
                    },
                ],
            },
        ],
    },
    {
        id: 28,
        label: 'MENUITEMS.REPORT.TEXT',
        isTitle: true,
    },
    {
        id: 29,
        label: 'MENUITEMS.REPORT.LIST.REPORT',
        icon: 'uil-graph-bar',
        link: '/report',
    },
    {
        id: 30,
        label: 'MENUITEMS.TOOLS.TEXT',
        isTitle: true,
    },
    {
        id: 31,
        label: 'MENUITEMS.SMS.LIST.SMS',
        icon: 'uil-comment-alt-message',
        subItems: [
            // {
            //     id: 32,
            //     label: 'MENUITEMS.SMS.LIST.QUEUE',
            //     link: '',
            //     parentId: 31,
            // },
            {
                id: 33,
                label: 'MENUITEMS.SMS.LIST.SENT',
                link: '/sms/sent',
                parentId: 31,
            },
            // {
            //     id: 34,
            //     label: 'MENUITEMS.SMS.LIST.RECEIVED',
            //     link: '',
            //     parentId: 31,
            // },
            // {
            //     id: 35,
            //     label: 'MENUITEMS.SMS.LIST.CAMPAIGNS',
            //     link: '',
            //     parentId: 31,
            // },
            {
                id: 36,
                label: 'MENUITEMS.SMS.LIST.SCHEDULED',
                link: '',
                parentId: 31,
            },
        ],
    },
    {
        id: 37,
        label: 'MENUITEMS.WHATSAPP.LIST.WHATSAPP',
        icon: 'uil-whatsapp',
        subItems: [
            // {
            //     id: 38,
            //     label: 'MENUITEMS.WHATSAPP.LIST.QUEUE',
            //     link: '',
            //     parentId: 37,
            // },
            {
                id: 39,
                label: 'MENUITEMS.WHATSAPP.LIST.SENT',
                link: '/whatsapp/sent',
                parentId: 37,
            },
            // {
            //     id: 40,
            //     label: 'MENUITEMS.WHATSAPP.LIST.RECEIVED',
            //     link: '',
            //     parentId: 37,
            // },
            // {
            //     id: 41,
            //     label: 'MENUITEMS.WHATSAPP.LIST.CAMPAIGNS',
            //     link: '',
            //     parentId: 37,
            // },
            {
                id: 42,
                label: 'MENUITEMS.WHATSAPP.LIST.SCHEDULED',
                link: '',
                parentId: 37,
            },
            // {
            //     id: 43,
            //     label: 'MENUITEMS.WHATSAPP.LIST.GROUP',
            //     link: '',
            //     parentId: 37,
            // },
            // {
            //     id: 44,
            //     label: 'MENUITEMS.WHATSAPP.LIST.ACCOUNTS',
            //     link: '',
            //     parentId: 37,
            // },
        ],
    },
    {
        id: 45,
        label: 'MENUITEMS.EMAIL.TEXT',
        icon: 'uil-at',
        subItems: [
            {
                id: 46,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: '/email/inbox',
                parentId: 45,
            },
            {
                id: 47,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: '',
                parentId: 45,
            },
        ],
    },
    {
        id: 48,
        label: 'MENUITEMS.TOOLS.LIST.MESSAGE.TEXT',
        icon: 'uil-comment-message',
        subItems: [
            {
                id: 49,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: '',
                parentId: 48,
            },
            {
                id: 49,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: '',
                parentId: 48,
            },
        ],
    },
    {
        id: 50,
        label: 'MENUITEMS.TOOLS.LIST.GROUPCONTACT.TEXT',
        icon: 'uil-exchange',
        subItems: [
            {
                id: 51,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: '',
                parentId: 50,
            },
            {
                id: 52,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: '',
                parentId: 50,
            },
        ],
    },
    {
        id: 53,
        label: 'MENUITEMS.TOOLS.LIST.CONTACT.TEXT',
        icon: 'uil-user-square',
        subItems: [
            {
                id: 54,
                label: 'MENUITEMS.TOOLS.LIST.CONTACT.LIST.LIST',
                link: '',
                parentId: 53,
            },
            {
                id: 55,
                label: 'MENUITEMS.TOOLS.LIST.CONTACT.LIST.ADD',
                link: '',
                parentId: 53,
            },
        ],
    },
    {
        id: 56,
        label: 'MENUITEMS.SETTING.TEXT',
        isTitle: true,
    },
    {
        id: 57,
        label: 'MENUITEMS.SETTING.LIST.SETTING',
        icon: 'uil-cog',
        link: '#',
    },
    {
        id: 58,
        label: 'MENUITEMS.SETTING.LIST.API',
        icon: 'uil-exchange',
        link: '/api',
    },
    {
        id: 59,
        label: 'MENUITEMS.LICENSE.TEXT',
        isTitle: true,
    },
    {
        id: 60,
        label: 'MENUITEMS.LICENSE.LIST.LICENSE',
        icon: 'uil-file-bookmark-alt',
        link: '/license',
    },
    // {
    //     id: 4,
    //     label: 'MENUITEMS.APPS.TEXT',
    //     isTitle: true,
    // },
    // {
    //     id: 5,
    //     label: 'MENUITEMS.CALENDAR.TEXT',
    //     icon: 'uil-calender',
    //     link: '/calendar',
    // },
    // {
    //     id: 6,
    //     label: 'MENUITEMS.CHAT.TEXT',
    //     icon: 'uil-comments-alt',
    //     link: '/chat',
    //     badge: {
    //         variant: 'warning',
    //         text: 'MENUITEMS.CHAT.BADGE',
    //     },
    // },
    // {
    //     id: 7,
    //     label: 'MENUITEMS.ECOMMERCE.TEXT',
    //     icon: 'uil-store',
    //     subItems: [
    //         {
    //             id: 8,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTS',
    //             link: '/ecommerce/products',
    //             parentId: 7,
    //         },
    //         {
    //             id: 9,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL',
    //             link: '/ecommerce/product-detail/1',
    //             parentId: 7,
    //         },
    //         {
    //             id: 10,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.ORDERS',
    //             link: '/ecommerce/orders',
    //             parentId: 7,
    //         },
    //         {
    //             id: 11,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.CUSTOMERS',
    //             link: '/ecommerce/customers',
    //             parentId: 7,
    //         },
    //         {
    //             id: 12,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.CART',
    //             link: '/ecommerce/cart',
    //             parentId: 7,
    //         },
    //         {
    //             id: 13,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.CHECKOUT',
    //             link: '/ecommerce/checkout',
    //             parentId: 7,
    //         },
    //         {
    //             id: 14,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.SHOPS',
    //             link: '/ecommerce/shops',
    //             parentId: 7,
    //         },
    //         {
    //             id: 15,
    //             label: 'MENUITEMS.ECOMMERCE.LIST.ADDPRODUCT',
    //             link: '/ecommerce/add-product',
    //             parentId: 7,
    //         },
    //     ],
    // },
    // {
    //     id: 16,
    //     label: 'MENUITEMS.EMAIL.TEXT',
    //     icon: 'uil-envelope',
    //     subItems: [
    //         {
    //             id: 17,
    //             label: 'MENUITEMS.EMAIL.LIST.INBOX',
    //             link: '/email/inbox',
    //             parentId: 16
    //         },
    //         {
    //             id: 18,
    //             label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
    //             link: '/email/read/1',
    //             parentId: 16
    //         }
    //     ]
    // },
    // {
    //     id: 19,
    //     label: 'MENUITEMS.INVOICES.TEXT',
    //     icon: 'uil-invoice',
    //     subItems: [
    //         {
    //             id: 20,
    //             label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
    //             link: '/invoices/list',
    //             parentId: 19
    //         },
    //         {
    //             id: 21,
    //             label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
    //             link: '/invoices/detail',
    //             parentId: 19
    //         },
    //     ]
    // },
    // {
    //     id: 22,
    //     label: 'MENUITEMS.CONTACTS.TEXT',
    //     icon: 'uil-book-alt',
    //     subItems: [
    //         {
    //             id: 23,
    //             label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
    //             link: '/contacts/grid',
    //             parentId: 22
    //         },
    //         {
    //             id: 24,
    //             label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
    //             link: '/contacts/list',
    //             parentId: 22
    //         },
    //         {
    //             id: 25,
    //             label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
    //             link: '/contacts/profile',
    //             parentId: 22
    //         }
    //     ]
    // },
    // {
    //     id: 26,
    //     label: 'MENUITEMS.PAGES.TEXT',
    //     isTitle: true
    // },
    // {
    //     id: 27,
    //     label: 'MENUITEMS.AUTHENTICATION.TEXT',
    //     icon: 'uil-user-circle',
    //     subItems: [
    //         {
    //             id: 28,
    //             label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN',
    //             link: '/pages/login-1',
    //             parentId: 27
    //         },
    //         {
    //             id: 29,
    //             label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER',
    //             link: '/pages/register-1',
    //             parentId: 27
    //         },
    //         {
    //             id: 30,
    //             label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD',
    //             link: '/pages/recoverpwd-1',
    //             parentId: 27
    //         },
    //         {
    //             id: 31,
    //             label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
    //             link: '/pages/lock-screen-1',
    //             parentId: 27
    //         }
    //     ]
    // },
    // {
    //     id: 32,
    //     label: 'MENUITEMS.UTILITY.TEXT',
    //     icon: 'uil-file-alt',
    //     subItems: [
    //         {
    //             id: 34,
    //             label:'MENUITEMS.UTILITY.LIST.STARTER',
    //             link: '/pages/starter',
    //             parentId: 32
    //         },
    //         {
    //             id: 35,
    //             label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
    //             link: '/pages/maintenance',
    //             parentId: 32
    //         },
    //         {
    //             id: 36,
    //             label: 'MENUITEMS.UTILITY.LIST.COMINGSOON',
    //             link: '/pages/comingsoon',
    //             parentId: 32
    //         },
    //         {
    //             id: 37,
    //             label: 'MENUITEMS.UTILITY.LIST.TIMELINE',
    //             link: '/pages/timeline',
    //             parentId: 32
    //         },
    //         {
    //             id: 38,
    //             label: 'MENUITEMS.UTILITY.LIST.FAQS',
    //             link: '/pages/faqs',
    //             parentId: 32
    //         },
    //         {
    //             id: 39,
    //             label: 'MENUITEMS.UTILITY.LIST.PRICING',
    //             link: '/pages/pricing',
    //             parentId: 32
    //         },
    //         {
    //             id: 40,
    //             label: 'MENUITEMS.UTILITY.LIST.ERROR404',
    //             link: '/pages/404',
    //             parentId: 32
    //         },
    //         {
    //             id: 41,
    //             label: 'MENUITEMS.UTILITY.LIST.ERROR500',
    //             link: '/pages/500',
    //             parentId: 32
    //         },
    //     ]
    // },
    // {
    //     id: 42,
    //     label: 'MENUITEMS.COMPONENTS.TEXT',
    //     isTitle: true
    // },
    // {
    //     id: 43,
    //     label: 'MENUITEMS.UIELEMENTS.TEXT',
    //     icon: 'uil-flask',
    //     subItems: [
    //         {
    //             id: 44,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
    //             link: '/ui/alerts',
    //             parentId: 43
    //         },
    //         {
    //             id: 45,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
    //             link: '/ui/buttons',
    //             parentId: 43
    //         },
    //         {
    //             id: 46,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
    //             link: '/ui/cards',
    //             parentId: 43
    //         },
    //         {
    //             id: 47,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
    //             link: '/ui/carousel',
    //             parentId: 43
    //         },
    //         {
    //             id: 48,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
    //             link: '/ui/dropdowns',
    //             parentId: 43
    //         },
    //         {
    //             id: 49,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
    //             link: '/ui/grid',
    //             parentId: 43
    //         },
    //         {
    //             id: 50,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
    //             link: '/ui/images',
    //             parentId: 43
    //         },
    //         {
    //             id: 52,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
    //             link: '/ui/modals',
    //             parentId: 43
    //         },
    //         {
    //             id: 53,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.RANGESLIDER',
    //             link: '/ui/rangeslider',
    //             parentId: 43
    //         },
    //         {
    //             id: 55,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
    //             link: '/ui/progressbar',
    //             parentId: 43
    //         },
    //         {
    //             id: 55,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
    //             link: '/ui/placeholder',
    //             parentId: 43
    //         },
    //         {
    //             id: 56,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.SWEETALERT',
    //             link: '/ui/sweet-alert',
    //             parentId: 43
    //         },
    //         {
    //             id: 57,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
    //             link: '/ui/tabs-accordions',
    //             parentId: 43
    //         },
    //         {
    //             id: 58,
    //             label:'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
    //             link: '/ui/typography',
    //             parentId: 43
    //         },
    //         {
    //             id: 59,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
    //             link: '/ui/video',
    //             parentId: 43
    //         },
    //         {
    //             id: 60,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
    //             link: '/ui/general',
    //             parentId: 43
    //         },
    //         {
    //             id: 61,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
    //             link: '/ui/colors',
    //             parentId: 43
    //         },
    //         {
    //             id: 62,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.RATING',
    //             link: '/ui/rating',
    //             parentId: 43
    //         }
    //     ]
    // },
    // {
    //     id: 64,
    //     label: 'MENUITEMS.FORMS.TEXT',
    //     icon: 'uil-shutter-alt',
    //     badge: {
    //         variant: 'primary',
    //         text: '6', //'MENUITEMS.FORMS.BADGE',
    //     },
    //     subItems: [
    //         {
    //             id: 65,
    //             label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
    //             link: '/form/elements',
    //             parentId: 64
    //         },
    //         {
    //             id: 66,
    //             label: 'MENUITEMS.FORMS.LIST.VALIDATION',
    //             link: '/form/validation',
    //             parentId: 64
    //         },
    //         {
    //             id: 67,
    //             label: 'MENUITEMS.FORMS.LIST.ADVANCED',
    //             link: '/form/advanced',
    //             parentId: 64
    //         },
    //         {
    //             id: 68,
    //             label: 'MENUITEMS.FORMS.LIST.EDITOR',
    //             link: '/form/editor',
    //             parentId: 64
    //         },
    //         {
    //             id: 69,
    //             label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
    //             link: '/form/uploads',
    //             parentId: 64
    //         },
    //         {
    //             id: 71,
    //             label: 'MENUITEMS.FORMS.LIST.REPEATER',
    //             link: '/form/repeater',
    //             parentId: 64
    //         },
    //         {
    //             id: 72,
    //             label: 'MENUITEMS.FORMS.LIST.WIZARD',
    //             link: '/form/wizard',
    //             parentId: 64
    //         },
    //         {
    //             id: 73,
    //             label: 'MENUITEMS.FORMS.LIST.MASK',
    //             link: '/form/mask',
    //             parentId: 64
    //         }
    //     ]
    // },
    // {
    //     id: 74,
    //     icon: 'uil-list-ul',
    //     label: 'MENUITEMS.TABLES.TEXT',
    //     subItems: [
    //         {
    //             id: 75,
    //             label: 'MENUITEMS.TABLES.LIST.BASIC',
    //             link: '/tables/basic',
    //             parentId: 74
    //         },
    //         {
    //             id: 76,
    //             label: 'MENUITEMS.TABLES.LIST.ADVANCED',
    //             link: '/tables/datatable',
    //             parentId: 74
    //         }
    //     ]
    // },
    // {
    //     id: 79,
    //     label: 'MENUITEMS.CHARTS.TEXT',
    //     icon: 'uil-chart',
    //     subItems: [
    //         {
    //             id: 80,
    //             label: 'MENUITEMS.CHARTS.LIST.APEX',
    //             link: '/charts/apex',
    //             parentId: 79
    //         },
    //         {
    //             id: 81,
    //             label: 'MENUITEMS.CHARTS.LIST.CHARTJS',
    //             link: '/charts/chartjs',
    //             parentId: 79
    //         },
    //         {
    //             id: 82,
    //             label: 'MENUITEMS.CHARTS.LIST.CHARTIST',
    //             link: '/charts/chartist',
    //             parentId: 79
    //         },
    //         {
    //             id: 83,
    //             label: 'MENUITEMS.CHARTS.LIST.ECHART',
    //             link: '/charts/echart',
    //             parentId: 79
    //         },
    //     ]
    // },
    // {
    //     id: 85,
    //     label: 'MENUITEMS.ICONS.TEXT',
    //     icon: 'uil-streering',
    //     subItems: [
    //         {
    //             id: 86,
    //             label: 'MENUITEMS.ICONS.LIST.UNICONS',
    //             link: '/icons/unicons',
    //             parentId: 85,
    //         },
    //         {
    //             id: 87,
    //             label: 'MENUITEMS.ICONS.LIST.BOXICONS',
    //             link: '/icons/boxicons',
    //             parentId: 85,
    //         },
    //         {
    //             id: 88,
    //             label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
    //             link: '/icons/materialdesign',
    //             parentId: 85,
    //         },
    //         {
    //             id: 89,
    //             label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
    //             link: '/icons/dripicons',
    //             parentId: 85,
    //         },
    //         {
    //             id: 90,
    //             label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
    //             link: '/icons/fontawesome',
    //             parentId: 85,
    //         },
    //     ],
    // },
    // {
    //     id: 100,
    //     label: 'MENUITEMS.MAPS.TEXT',
    //     icon: 'uil-location-point',
    //     subItems: [
    //         {
    //             id: 101,
    //             label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
    //             link: '/maps/google',
    //             parentId: 100
    //         }
    //     ]
    // },
    // {
    //     id: 104,
    //     label: 'MENUITEMS.MULTILEVEL.TEXT',
    //     icon: 'uil-share-alt',
    //     subItems: [
    //         {
    //             id: 105,
    //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
    //             parentId: 104
    //         },
    //         {
    //             id: 106,
    //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
    //             parentId: 104,
    //             subItems: [
    //                 {
    //                     id: 107,
    //                     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
    //                     parentId: 106,
    //                 },
    //                 {
    //                     id: 108,
    //                     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
    //                     parentId: 106,
    //                 }
    //             ]
    //         },
    //     ]
    // }
];
