// assets
import { IconCpu } from '@tabler/icons-react';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

// constant
const icons = {
    ComputerOutlinedIcon,
    FormatListBulletedOutlinedIcon,
    IconCpu
};

const resource = {
    id: 'resources',
    title: 'Resources',
    type: 'group',
    children: [
        {
            id: 'management',
            title: 'Resource Management',
            type: 'collapse',
            icon: icons.ComputerOutlinedIcon,

            children: [
                {
                    id: 'resourceList',
                    title: 'Shared Resources',
                    type: 'item',
                    url: '/resource/shared',
                    icon: icons.FormatListBulletedOutlinedIcon
                },
                {
                    id: 'shareResource',
                    title: 'Add Resource',
                    type: 'item',
                    url: '/resource/add',
                    icon: icons.IconCpu
                }
            ]
        }
    ]
};

export default resource;