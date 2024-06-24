// material-ui
import { IconCpu } from '@tabler/icons-react';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

// project imports
import SharedResource from "./SharedResource";
import AddResource from "./AddResource";

const resourceTabItems = {
    items: [
        {
            tab: <SharedResource/>,
            icon: <FormatListBulletedOutlinedIcon fontSize="small" />,
            title: "Shared resources",
            value: "1"
        },
        {
            tab: <AddResource/>,
            icon: <IconCpu fontSize="small" />,
            title: "Add resource",
            value: "2"
        }
    ]
};

export default resourceTabItems;