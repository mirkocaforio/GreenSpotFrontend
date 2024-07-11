import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import { gridSpacing } from '../../../store/constant';

const UserDashboardSkeleton = () => {
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <Skeleton variant="rectangular" width="100%" height={118} />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Skeleton variant="rectangular" width="100%" height={400} />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={4}>
                        <Grid item container direction="column" spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default UserDashboardSkeleton;