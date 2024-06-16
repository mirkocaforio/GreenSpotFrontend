// assets
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

// constant
const icons = {
    TaskOutlinedIcon,
    FormatListBulletedOutlinedIcon,
    AddTaskOutlinedIcon,
    AssignmentOutlinedIcon
};

const task = {
    id: 'taskManagement',
    title: 'Task Management',
    type: 'group',
    children: [
        {
            id: 'management',
            title: 'Task Management',
            type: 'collapse',
            icon: icons.TaskOutlinedIcon,

            children: [
                {
                    id: 'assignTask',
                    title: 'Assign Task',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.AddTaskOutlinedIcon,
                    target: true
                },
                {
                    id: 'taskList',
                    title: 'Task List',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.FormatListBulletedOutlinedIcon,
                    target: true
                },
                {
                    id: 'manageTask',
                    title: 'Manage Task',
                    type: 'item',
                    url: '/sample-page',
                    icon: icons.AssignmentOutlinedIcon,
                    target: true
                }
            ]
        }
    ]
};

export default task;