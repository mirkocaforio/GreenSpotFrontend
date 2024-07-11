import React from 'react';
import StatCard from './StatCard';
import MainCard from "../../../ui-component/cards/MainCard";
import {AssignmentTurnedInOutlined, PeopleAltOutlined, SupervisedUserCircleOutlined} from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

// ===========================|| DASHBOARD DEFAULT - STATS GRID ||=========================== //

const StatsGrid = ({data}) => (
    <MainCard content={false}>
        <Grid container direction="column">
            <Grid item container sx={{ width: '100%', height: '100%', borderBottom: '1px solid #E0E0E0' }}>
                <Grid item xs={6} sx={{ borderRight: '1px solid #E0E0E0', height: '100%' }}>
                    <StatCard icon={PeopleAltOutlined} title="Active Members" value={data?.activeMemberCount} />
                </Grid>
                <Grid item xs={6} sx={{ height: '100%' }}>
                    <StatCard icon={SupervisedUserCircleOutlined} title="Active Users" value={data?.activeUserCount} />
                </Grid>
            </Grid>
            <Grid item container justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100%' }}>
                <Grid item xs={6} sx={{ borderRight: '1px solid #E0E0E0', height: '100%' }}>
                    <StatCard icon={AssignmentTurnedInOutlined} title="Tasks Completed" value={data?.tasksCompleted} />
                </Grid>
                <Grid item xs={6} sx={{ height: '100%' }}>
                    <StatCard icon={AssignmentOutlinedIcon} title="Tasks Submitted" value={data?.tasksSubmitted} />
                </Grid>
            </Grid>
        </Grid>
    </MainCard>
);

StatsGrid.propTypes = {
    data: PropTypes.object
};

export default StatsGrid;