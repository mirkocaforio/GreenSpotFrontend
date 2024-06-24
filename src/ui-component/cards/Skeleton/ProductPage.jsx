import React from 'react';
import { Grid, Box, IconButton, Skeleton, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ProductDetailSkeleton = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ position: 'relative' }}>
                        <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: '10px' }} />
                        <IconButton sx={{ position: 'absolute', top: 10, right: 10 }}>
                            <Skeleton variant="circular" width={40} height={40} />
                        </IconButton>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Grid container justifyContent={"center"} alignItems={"center"}>
                                <Grid item>
                                    <IconButton>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                                        {[1, 2, 3].map((_, index) => (
                                            <Skeleton variant="circular" key={index} width={64} height={64} sx={{ mx: 1 }} />
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Skeleton variant="text" width="30%" height={30} />
                        <Skeleton variant="text" width="70%" height={40} />
                        <Skeleton variant="text" width="50%" height={30} />
                        <Box display="flex" alignItems="center" mb={2}>
                            <Skeleton variant="text" width="10%" height={30} />
                            <Skeleton variant="text" width="20%" height={20} sx={{ ml: 1 }} />
                        </Box>
                        <Skeleton variant="text" width="30%" height={40} />
                        <Skeleton variant="text" width="20%" height={30} sx={{ ml: 1 }} />
                        <Skeleton variant="text" width="50%" height={20} sx={{ ml: 1 }} />
                        <Divider sx={{ my: 2 }} />
                        <Box mb={2}>
                            <Skeleton variant="text" width="30%" height={30} />
                            <Box display="flex" gap={2}>
                                <Skeleton variant="circular" width={36} height={36} />
                                <Skeleton variant="circular" width={36} height={36} />
                            </Box>
                        </Box>
                        <Box mb={2}>
                            <Skeleton variant="text" width="30%" height={30} />
                            <Skeleton variant="rectangular" width="100%" height={56} sx={{ maxWidth: 200 }} />
                        </Box>
                        <Box mb={2}>
                            <Skeleton variant="text" width="30%" height={30} />
                            <Box display="flex" alignItems="center">
                                <Skeleton variant="rectangular" width={40} height={40} />
                                <Skeleton variant="text" width="30%" height={30} sx={{ mx: 2 }} />
                                <Skeleton variant="rectangular" width={40} height={40} />
                            </Box>
                        </Box>
                        <Box display="flex" gap={2} mb={2}>
                            <Skeleton variant="rectangular" width="150px" height="40px" />
                            <Skeleton variant="rectangular" width="150px" height="40px" />
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <Skeleton variant="text" width="20%" height={30} />
                            <Skeleton variant="text" width="20%" height={30} sx={{ ml: 2 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetailSkeleton;
