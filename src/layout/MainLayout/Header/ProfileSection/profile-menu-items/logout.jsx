//assets
import {IconLogout} from "@tabler/icons-react";

// ===========================|| LOGOUT ITEM ||=========================== //

const logoutItem = ({onClick}) => {

    return {
        index: 4,
        label: 'Logout',
        icon: <IconLogout stroke={1.5} size="1.3rem"/>,
        onClick: onClick
    }
}

export default logoutItem;