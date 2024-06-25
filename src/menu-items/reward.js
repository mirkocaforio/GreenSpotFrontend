// assets
import { IconAward } from '@tabler/icons-react';
import { ShoppingBasketOutlined } from "@mui/icons-material";

// constant
const icons = { IconAward, ShoppingBasketOutlined};

const reward = {
    id: 'rewards',
    title: 'Rewards',
    type: 'group',
    children: [
        {
            id: 'store',
            title: 'Rewards Store',
            type: 'item',
            url: '/store',
            icon: icons.IconAward,
            breadcrumbs: true
        },{
            id: 'redeems',
            title: 'Redeem History',
            type: 'item',
            url: '/redeem/history',
            icon: icons.ShoppingBasketOutlined,
            breadcrumbs: true
        }
    ]
};

export default reward;