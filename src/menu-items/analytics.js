// assets
import { IconDeviceAnalytics } from '@tabler/icons-react';

// constant
const icons = { IconDeviceAnalytics };

const analytics = {
    id: 'analytics',
    title: 'Control Panel',
    type: 'group',
    children: [
        {
            id: 'analytics',
            title: 'Analytics',
            type: 'item',
            url: '/',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default analytics;