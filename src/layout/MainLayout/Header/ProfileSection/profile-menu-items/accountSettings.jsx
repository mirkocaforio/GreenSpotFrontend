// assets
import { IconSettings } from '@tabler/icons-react';

// ===========================|| ACCOUNT SETTINGS MENU ITEM ||=========================== //

const accountSettingsItem = ({onClick }) => {
    return {
        index: 0,
        label: 'Account Settings',
        icon: <IconSettings stroke={1.5} size="1.3rem"/>,
        route: '/profile',
        onCick: onClick
    }
}

export default accountSettingsItem;