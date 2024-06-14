// material-ui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {ManageAccounts} from "@mui/icons-material";

// project imports
import SecurityTab from "./Security";
import ProfileTab from "./Profile";
import DetailsTab from "./Details";


const profileTabItems = {
    items: [
        {
            tab: <ProfileTab/>,
            icon: <AccountCircleIcon fontSize="small" />,
            title: "Profile",
            value: "1"
        },
        {
            tab: <DetailsTab/>,
            icon: <ManageAccounts fontSize="small" />,
            title: "Details",
            value: "2"
        },
        {
            tab: <SecurityTab/>,
            icon: <LockOpenIcon fontSize="small" />,
            title: "Security",
            value: "3"
        }
    ]
};

export default profileTabItems;