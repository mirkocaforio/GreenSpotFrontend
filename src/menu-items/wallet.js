// assets
import {IconWallet} from '@tabler/icons-react';

// constant
const icons = {IconWallet};

const wallet = {
    id: 'walletManagement',
    title: 'Wallet',
    type: 'group',
    children: [
        {
            id: 'walletBalance',
            title: 'Wallet Balance',
            type: 'item',
            url: '/wallet',
            icon: icons.IconWallet,
            breadcrumbs: false
        }
    ]
};

export default wallet;