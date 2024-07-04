import React from 'react';
import Box from '@mui/material/Box';
import StatCard from './StatCard';
import MainCard from "../../../ui-component/cards/MainCard";
import {AssignmentTurnedInOutlined, PeopleAltOutlined, SupervisedUserCircleOutlined} from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PropTypes from "prop-types";

// ===========================|| DASHBOARD DEFAULT - STATS GRID ||=========================== //

const StatsGrid = ({data}) => (
    <MainCard content={false}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{
                display: 'flex',
                width: '100%',
                borderBottom: '1px solid #E0E0E0' }}>
                <Box sx={{ flex: 1, borderRight: '1px solid #E0E0E0' }}>
                    <StatCard icon={PeopleAltOutlined} title="Active Members" value={data?.activeMemberCount} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <StatCard icon={SupervisedUserCircleOutlined} title="Active Users" value={data?.activeUserCount} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Box sx={{ flex: 1, borderRight: '1px solid #E0E0E0' }}>
                    <StatCard icon={AssignmentTurnedInOutlined} title="Tasks Completed" value={data?.tasksCompleted} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <StatCard icon={AssignmentOutlinedIcon} title="Tasks Submitted" value={data?.tasksSubmitted} />
                </Box>
            </Box>
        </Box>
    </MainCard>
);

StatsGrid.propTypes = {
    data: PropTypes.object
};

export default StatsGrid;