// assets
import { IconDeviceAnalytics, IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconDeviceAnalytics, IconSettings };

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
        },{
            id: 'settings',
            title: 'REC Settings',
            type: 'item',
            url: '/settings',
            icon: icons.IconSettings,
            breadcrumbs: true
        }
    ]
};

export default analytics;