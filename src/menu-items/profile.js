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
        }
    ]
};

export default profile;