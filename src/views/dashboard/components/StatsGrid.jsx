import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import StatCard from './StatCard';
import ShareIcon from '@mui/icons-material/Share';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import ReplayIcon from '@mui/icons-material/Replay';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SubCard from "../../../ui-component/cards/SubCard";
import MainCard from "../../../ui-component/cards/MainCard";
import {AssignmentTurnedInOutlined, PeopleAltOutlined, SupervisedUserCircleOutlined} from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PropTypes from "prop-types";

// ===========================|| DASHBOARD DEFAULT - STATS GRID ||=========================== //

const StatsGrid = ({data}) => (
    <MainCard content={false}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%', borderBottom: '1px solid #E0E0E0' }}>
                <Box sx={{ flex: 1, borderRight: '1px solid #E0E0E0' }}>
                    <StatCard icon={SupervisedUserCircleOutlined} title="Active Users" value={data?.activeUserCount} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <StatCard icon={PeopleAltOutlined} title="Active Members" value={data?.activeMemberCount} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ flex: 1, borderRight: '1px solid #E0E0E0' }}>
                    <StatCard icon={AssignmentOutlinedIcon} title="Tasks Submitted" value={data?.tasksSubmitted} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <StatCard icon={AssignmentTurnedInOutlined} title="Tasks Completed" value={data?.tasksCompleted} />
                </Box>
            </Box>
        </Box>
    </MainCard>
);

StatsGrid.propTypes = {
    data: PropTypes.object
};

export default StatsGrid;