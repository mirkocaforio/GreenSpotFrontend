import React from 'react';
import { Grid, Skeleton, Box, Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { styled } from '@mui/system';

const SubCardSkeleton = ({ title, children }) => (
    <Card sx={{ mb: 2, width: "100%"}}>
        <CardContent>
            {title && (
                <Typography variant="h5" gutterBottom>
                    <Skeleton width="30%" />
                </Typography>
            )}
            {children}
        </CardContent>
    </Card>
);

const FormSkeleton = () => {
    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Grid container  spacing={12}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SubCardSkeleton title="Image">
                        <Skeleton variant="rectangular" width="100%" height={56} />
                        <Box sx={{ mt: 2 }}>
                            <Skeleton variant="rectangular" width="100%" height={300} />
                        </Box>
                    </SubCardSkeleton>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SubCardSkeleton title="Details">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton variant="rectangular" width="100%" height={56} />
                            </Grid>
                        </Grid>
                    </SubCardSkeleton>
                </Grid>
                <Grid item xs={12}>
                    <SubCardSkeleton title="Additional Information">
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </SubCardSkeleton>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <SubCardSkeleton title="Status">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Skeleton variant="circular" width={40} height={40} />
                        </Box>
                    </SubCardSkeleton>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <SubCardSkeleton>
                        <Button fullWidth size="large" variant="contained" disabled>
                            <Skeleton variant="text" width="100%" />
                        </Button>
                    </SubCardSkeleton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormSkeleton;
