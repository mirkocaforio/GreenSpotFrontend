import profileTabItems from "./items";
import {TabContext, TabPanel} from "@mui/lab";
import {Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {ROLE_ADMIN, ROLE_MEMBER, ROLE_UTENTE} from "../../../config";

const TabList = ({content, value, handleChange}) => {
    const {profile} = useSelector(state => state.profile);
    const role = profile?.role;

    let items = [];

    switch (role) {
        case ROLE_ADMIN:
            items = profileTabItems.adminItems;
            break;
        case ROLE_UTENTE:
            items = profileTabItems.userItems;
            break;
        case ROLE_MEMBER:
            items = profileTabItems.memberItems;
            break;
        default:
            break;
    }

    const tabItems = items.map((item) => {
        switch (content) {
            case "tab":
                return <Tab icon={item.icon}
                            iconPosition="start"
                            key={"Tab" + item.value}
                            label={item.title}
                            value={item.value}
                            sx={{minHeight: 0}}
                />
            case "content":
                return <TabPanel key={"Panel" + item.value} value={item.value}>
                    {item.tab}
                </TabPanel>;
        }
    });
    return <>
        {content === "content" ?
            (<TabContext value={value}>{tabItems}</TabContext>)
            : (<Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon position profile tabs"
                variant="scrollable"
                scrollButtons="auto"
                sx={{overflow: 'auto'}}
            >{tabItems}
            </Tabs>)
        }</>;
}

TabList.propTypes = {
    content: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default TabList;