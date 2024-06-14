import profileTabItems from "./items";
import {TabContext, TabPanel} from "@mui/lab";
import {Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";

const TabList = ({content, value, handleChange}) => {
    const tabItems = profileTabItems.items.map((item) => {
        switch (content){
            case "tab":
                return <Tab icon={item.icon}
                            iconPosition="start"
                            key={"Tab"+item.value}
                            label={item.title}
                            value={item.value}
                            sx={{minHeight: 0}}
                />
            case "content":
                return <TabPanel key={"Panel"+item.value} value={item.value}>
                    {item.tab}
                </TabPanel>;
        }
    });
    return <>{ content === "content"
        ? (<TabContext value={value}>{tabItems}</TabContext>)
        : (<Tabs value={value} onChange={handleChange} aria-label="icon position profile tabs">{tabItems}</Tabs>) }</>;
}

TabList.propTypes = {
    content: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default TabList;