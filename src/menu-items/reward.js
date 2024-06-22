// assets
import { IconAward } from '@tabler/icons-react';

// constant
const icons = { IconAward };

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
        }
    ]
};

export default reward;