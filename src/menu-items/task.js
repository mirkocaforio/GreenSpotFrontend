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
                    url: '/task',
                    icon: icons.AddTaskOutlinedIcon,
                    target: false
                },
                {
                    id: 'manageTask',
                    title: 'Manage Tasks',
                    type: 'item',
                    url: '/task/list',
                    icon: icons.AssignmentOutlinedIcon,
                    target: false
                }
            ]
        }
    ]
};

export default task;