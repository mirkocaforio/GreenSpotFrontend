import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {gridSpacing} from "../../../store/constant";
import SubCard from "../SubCard";

const ResourceFormSkeleton = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
                <SubCard title={<Skeleton variant="text" width="30%"/>}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                    </Grid>
                </SubCard>

                <Box sx={{my: 2}}>
                    <Skeleton variant="rectangular" height={2}/>
                </Box>

                <SubCard title={<Skeleton variant="text" width="30%"/>}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={4}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                    </Grid>
                </SubCard>

                <Box sx={{my: 2}}>
                    <Skeleton variant="rectangular" height={2}/>
                </Box>

                <SubCard title={<Skeleton variant="text" width="30%"/>}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Skeleton variant="rectangular" height={40}/>
                        </Grid>
                    </Grid>
                </SubCard>

                <Box sx={{display: 'flex', justifyContent: 'flex-start', mt: 2}}>
                    <Skeleton variant="rectangular" height={40} width="20%"/>
                    <Box sx={{mx: 2}}/>
                    <Skeleton variant="rectangular" height={40} width="20%"/>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ResourceFormSkeleton;