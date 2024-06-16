// assets
import { IconCpu } from '@tabler/icons-react';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { IconEdit } from '@tabler/icons-react';

// constant
const icons = {
    ComputerOutlinedIcon,
    FormatListBulletedOutlinedIcon,
    IconCpu,
    IconEdit
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
                    id: 'assignResource',
                    title: 'Assign Resource',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.IconCpu,
                    target: true
                },
                {
                    id: 'resourceList',
                    title: 'Resource List',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.FormatListBulletedOutlinedIcon,
                    target: true
                },
                {
                    id: 'updateResource',
                    title: 'Update Resource',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.IconEdit,
                    target: true
                }
            ]
        }
    ]
};

export default resource;