// assets
import { IconUserHeart } from '@tabler/icons-react';
import { IconUserCancel } from '@tabler/icons-react';

// constant
const icons = {IconUserHeart, IconUserCancel}

const profile = {
    id: 'profile',
    title: 'Users Management',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Users Control Panel',
            type: 'item',
            url: '/users',
            icon: icons.IconUserHeart,
            breadcrumbs: true
        },
        /*{
            id: 'enable',
            title: 'Enable Profile',
            type: 'item',
            url: '/wallet',
            icon: icons.IconUserHeart,
            breadcrumbs: false
        },
        {
            id: 'disable',
            title: 'Disable Profile',
            type: 'item',
            url: '/wallet',
            icon: icons.IconUserCancel,
            breadcrumbs: false
        }*/
    ]
};

export default profile;