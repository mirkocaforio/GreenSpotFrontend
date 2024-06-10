//{ index: 1, label: 'Social Profile', icon: <IconUser stroke={1.5} size="1.3rem" />, route: '#', chip: '02' },

//assets
import { IconUser } from '@tabler/icons-react';

// ===========================|| SOCIAL PROFILE MENU ITEM ||=========================== //

const socialProfileItem = ({onClick, chipValue }) => {
    return {
        index: 1,
        label: 'Social Profile',
        icon: <IconUser stroke={1.5} size="1.3rem" />,
        route: '#',
        chip: chipValue,
        onClick: onClick
    }
}

export default socialProfileItem;
