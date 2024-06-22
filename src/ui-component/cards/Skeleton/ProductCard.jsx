import React from 'react';
import { Card, CardContent, Grid, Skeleton } from '@mui/material';

// ==============================|| SKELETON - PRODUCT CARD ||============================== //

const ProductCardSkeleton = () => (
    <Card sx={{m: 2 }}>
        <Skeleton variant="rectangular" height={200} animation="wave" />
        <CardContent>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" height={20} width="80%" sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" height={30} width="50%" sx={{ mt: 1 }} />
        </CardContent>
    </Card>
);

const ProductListSkeleton = () => (
    <Grid container spacing={2}>
        {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCardSkeleton />
            </Grid>
        ))}
    </Grid>
);

export default ProductListSkeleton;
