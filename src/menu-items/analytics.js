// assets
import { IconDeviceAnalytics, IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconDeviceAnalytics, IconSettings };

const analytics = {
    id: 'analyticsGroup',
    title: 'Analytics Center',
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