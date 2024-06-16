// assets
import { IconUserHeart } from '@tabler/icons-react';
import { IconUserCancel } from '@tabler/icons-react';

// constant
const icons = {IconUserHeart, IconUserCancel}

const profile = {
    id: 'profile',
    title: 'Profile Management',
    type: 'group',
    children: [
        {
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
        }
    ]
};

export default profile;