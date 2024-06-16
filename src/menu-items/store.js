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
            title: 'Add reward',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBasketPlus,
            breadcrumbs: false
        }
    ]
};

export default store;