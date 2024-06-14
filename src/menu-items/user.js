// assets
import { IconWallet } from '@tabler/icons-react';

// constant
const icons = { IconWallet };

const user = {
    id: 'user',
    title: 'User',
    type: 'group',
    children: [
        {
            id: 'wallet',
            title: 'Wallet',
            type: 'item',
            url: '/wallet',
            icon: icons.IconWallet,
            breadcrumbs: false
        }
    ]
};

export default user;