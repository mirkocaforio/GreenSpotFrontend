import ProfileTab from "./Profile";

// material-ui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import SecurityTab from "./Security";

const profileTabItems = {
    items: [
        {
            tab: ProfileTab,
            icon: <AccountCircleIcon fontSize="small" />,
            title: "Profile",
            value: "1"
        },
        {
            tab: SecurityTab,
            icon: <LockOpenIcon fontSize="small" />,
            title: "Security",
            value: "2"
        }
    ]
};

export default profileTabItems;