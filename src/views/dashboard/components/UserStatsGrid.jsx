import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import StatCard from "./StatCard";
import {AssignmentTurnedInOutlined} from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MainCard from "../../../ui-component/cards/MainCard";
import React from "react";

const UserStatsGrid = ({userStats}) => (
    <MainCard content={false}>
        <Grid container direction="column">
            <Grid item container justifyContent="center" alignItems="center" sx={{width: '100%', height: '100%'}}>
                <Grid item xs={6} sx={{height: '100%'}}>
                    <StatCard
                        icon={AssignmentOutlinedIcon}
                        title="Tasks Submitted"
                        value={userStats?.tasksSubmitted}
                    />
                </Grid>
                <Grid item xs={6} sx={{borderRight: '1px solid #E0E0E0', height: '100%'}}>
                    <StatCard
                        icon={AssignmentTurnedInOutlined}
                        title="Tasks Completed"
                        value={userStats?.tasksCompleted}
                    />
                </Grid>
            </Grid>
        </Grid>
    </MainCard>
);


UserStatsGrid.propTypes = {
    userStats: PropTypes.object
}

export default UserStatsGrid;