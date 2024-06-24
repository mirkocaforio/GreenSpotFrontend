// assets
import { IconBasketPlus } from '@tabler/icons-react';

// constant
const icons = {IconBasketPlus};

const store = {
    id: 'store',
    title: 'Store Management',
    type: 'group',
    children: [
        {
            id: 'store',
            title: 'Reward List',
            type: 'item',
            url: '/store/management',
            icon: icons.IconBasketPlus,
            breadcrumbs: true
        }
    ]
};

export default store;