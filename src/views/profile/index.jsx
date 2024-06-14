//react
import { useState} from "react";

// material-ui
import {  Box } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TabList from "./profile-tab";

// ==============================|| TYPOGRAPHY ||============================== //

const ProfilePage = () => {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <MainCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList content="tab" value={value} handleChange={handleChange}/>
        </Box>
        <TabList content="content" value={value}/>
    </MainCard>
)};

export default ProfilePage;
