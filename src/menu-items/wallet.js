// assets
import {IconWallet} from '@tabler/icons-react';
import {AccountBalanceWalletOutlined} from "@mui/icons-material";

// constant
const icons = {
    IconWallet,
    AccountBalanceWalletOutlined};

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
            icon: icons.AccountBalanceWalletOutlined,
            breadcrumbs: true
        }
    ]
};

export default wallet;