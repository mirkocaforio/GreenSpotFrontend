import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonCustomCard from 'ui-component/cards/Skeleton/CustomCard';

// ===========================|| DASHBOARD DEFAULT - CUSTOM CARD ||=========================== //

const SmallInfoCard = ({ isLoading, icon: Icon,iconSx, customSx, textSx, title, currentValue }) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = React.useState(false);

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
                <Grid container alignItems="center" justifyContent={"center"}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>
                    <Grid item container justifyContent="flex-start" xs={Icon ? 8 : 12}>
                        <Grid item>
                            <Box sx={{ p: 2.5 }}>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Grid container justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="h5"
                                                            sx={{
                                                                ...textSx,
                                                                fontWeight: 200,
                                                            }}>
                                                    {title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Typography variant="h3"
                                                            sx={{
                                                                ...textSx,
                                                            }}>
                                                    {currentValue}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    {Icon && (
                    <Grid item container justifyContent="flex-end" alignContent={"center"} xs={4}>
                        <Grid item>
                            <Grid container justifyContent={"center"} alignItems={"center"} sx={{
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform 0.3s',}}>
                                <Grid item>
                                    <Icon style={{ width: '64', height: '64', paddingRight: "5", color: theme.palette.grey[300], ...iconSx }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    )}

                </Grid>
            </MainCard>
        )
    );
};

SmallInfoCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    customSx: PropTypes.object,
    textSx: PropTypes.object,
    title: PropTypes.string,
    currentValue: PropTypes.number,
    iconSx: PropTypes.object,
    isLoading: PropTypes.bool
};

export default SmallInfoCard;