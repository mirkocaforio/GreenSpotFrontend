// material-ui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {ManageAccounts} from "@mui/icons-material";
import PaymentIcon from '@mui/icons-material/Payment';

// project imports
import SecurityTab from "./Security";
import ProfileTab from "./Profile";
import DetailsTab from "./Details";
import PaymentTab from "./Payment";

const profileTabItems = {
    userItems: [
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
            tab: <PaymentTab/>,
            icon: <PaymentIcon fontSize="small" />,
            title: "Payment",
            value: "3"
        },
        {
            tab: <SecurityTab/>,
            icon: <LockOpenIcon fontSize="small" />,
            title: "Security",
            value: "4"
        }
    ],
    memberItems: [
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
    ],
    adminItems: [
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
    ],
};

export default profileTabItems;