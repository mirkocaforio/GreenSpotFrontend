import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";


// ===========================|| DASHBOARD DEFAULT - STAT CARD ||=========================== //

const StatCard = ({ icon: Icon, title, value }) => {
    const theme = useTheme();

    return (
        <Grid container alignItems={"center"} justifyContent="center" sx={{ p: 3 }}>
            <Grid item xs={6}>
                <Grid container justifyContent="flex-start" >
                    <Grid item>
                        <Icon style={{ width: 32, height: 32, color: theme.palette.secondary.dark }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid containter justifyContent="flex-end" alignItems="center">
                    <Grid item>
                        <Grid container direction={"column"} justifyContent="center" alignItems={"center"} >
                            <Grid item >
                                <Typography variant="h3">{value}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{textAlign: "center"}} variant="subtitle2">{title}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

StatCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default StatCard;