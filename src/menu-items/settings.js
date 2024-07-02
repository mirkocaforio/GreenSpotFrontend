// assets
import { IconDeviceAnalytics, IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconDeviceAnalytics, IconSettings };

const settings = {
    id: 'analytics',
    title: 'Control Panel',
    type: 'group',
    children: [
        {
            id: 'settings',
            title: 'REC Settings',
            type: 'item',
            url: '/settings',
            icon: icons.IconSettings,
            breadcrumbs: true
        }
    ]
};

export default settings;