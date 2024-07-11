import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { gridSpacing } from '../../../store/constant';

export const MemberDashboardSkeleton = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={4} sm={12} lg={4}>
                <Skeleton variant="rectangular" width="100%" height={118} animation="wave" />
            </Grid>
            <Grid item xs={12} md={4} sm={12} lg={4}>
                <Skeleton variant="rectangular" width="100%" height={118} animation="wave" />
            </Grid>
            <Grid item xs={12} md={4} sm={12} lg={4}>
                <Skeleton variant="rectangular" width="100%" height={118} animation="wave" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Skeleton variant="rectangular" width="100%" height={320} animation="wave" />
            </Grid>
        </Grid>
    );
};

export default MemberDashboardSkeleton;