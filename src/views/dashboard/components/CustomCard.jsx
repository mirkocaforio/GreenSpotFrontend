import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonCustomCard from 'ui-component/cards/Skeleton/CustomCard';

// ===========================|| DASHBOARD DEFAULT - CUSTOM CARD ||=========================== //

const CustomCard = ({ isLoading, icon: Icon,iconSx, customSx, textSx, title, currentValue, previousValue }) => {
    const theme = useTheme();

    return (
        isLoading ? (<SkeletonCustomCard/>) : (
        <MainCard
            border={false}
            content={false}
            sx={{
                ...customSx,
                overflow: 'hidden',
                position: 'relative',
                borderRadius: '12px', // Angoli arrotondati
            }}
        >
            <Grid container alignItems="center">
                <Grid item container justifyContent="flex-start" xs={6}>
                    <Grid item>
                        <Box sx={{ p: 3 }}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h4"
                                                        sx={{
                                                            ...textSx,
                                                            }}>
                                                {title}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography variant="h2"
                                                        sx={{
                                                            ...textSx,
                                                            }}>
                                                {currentValue}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: 'secondary.200'
                                        }}
                                    >
                                        {previousValue} Last Month
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="flex-end" xs={6}>
                    <Icon style={{ width: '120', height: '120', paddingRight: "20", color: theme.palette.grey[300], ...iconSx }} />
                </Grid>
            </Grid>
        </MainCard>
        )
    );
};

CustomCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    customSx: PropTypes.object,
    textSx: PropTypes.object,
    title: PropTypes.string,
    currentValue: PropTypes.string,
    previousValue: PropTypes.string,
    iconSx: PropTypes.object,
    isLoading: PropTypes.bool
};

export default CustomCard;