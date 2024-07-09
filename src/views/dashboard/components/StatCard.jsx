import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

//project imports
import SkeletonStatCard from "../../../ui-component/cards/Skeleton/StatCard";

// ===========================|| DASHBOARD DEFAULT - STAT CARD ||=========================== //

const StatCard = ({ icon: Icon, title, value }) => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if(value){
            setIsLoading(false);
        }else {
            setIsLoading(true);
        }
    }, [value]);

    return (
        isLoading ? (<SkeletonStatCard/>):
            (<Grid container={true} alignItems={"center"} justifyContent="center" sx={{ p: 3 }}>
                <Grid item xs={6}>
                    <Grid container={true} justifyContent="flex-start" >
                        <Grid item>
                            <Icon style={{ width: 32, height: 32, color: theme.palette.secondary.dark }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container={true} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Grid container={true} direction="column" justifyContent="center" alignItems={"center"} >
                                <Grid item xs={12}>
                                    <Typography variant="h3">{value}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{textAlign: "center"}} variant="subtitle2">{title}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>)
    );
};

StatCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.number
};

export default StatCard;