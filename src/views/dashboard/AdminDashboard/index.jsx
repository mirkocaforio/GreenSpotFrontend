import Grid from "@mui/material/Grid";
import CustomCard from "../components/CustomCard";
import {useTheme} from "@mui/material/styles";
import {AccessTimeTwoTone, OfflineBoltTwoTone} from "@mui/icons-material";
import StatsGrid from "../components/StatsGrid";
import TotalStatBarChart from "../components/TotalStatBarChart";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {roundValue} from "../../../utils/math";


export const AdminDashboard = () => {
    const theme = useTheme();

    const { overallAnalytics } = useSelector(state => state.analytics);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(overallAnalytics){
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [overallAnalytics]);

    return (
        <Grid container spacing={2} >
            <Grid item xs={12} md={12} sm={12} lg={8}>
                <Grid container direction="column" justifyContent={"center"} spacing={2}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CustomCard
                                    customSx={{
                                        bgcolor: 'primary.dark',
                                    }}
                                    textSx={{
                                        color: 'warning.dark'
                                    }}
                                    title={"Total Energy Used"}
                                    currentValue={overallAnalytics?.energyConsumed + " kWh"}
                                    previousValue={""}
                                    icon={OfflineBoltTwoTone}
                                    iconSx={{
                                        color: theme.palette.warning.main
                                    }}
                                    isLoading={isLoading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CustomCard
                                    customSx={{
                                        bgcolor: 'secondary.dark',
                                    }}
                                    textSx={{
                                        color: 'primary.light'
                                    }}
                                    title={"Total Work Time"}
                                    currentValue={roundValue(overallAnalytics?.workMinutes,2) + " min"}
                                    previousValue={""}
                                    icon={AccessTimeTwoTone}
                                    iconSx={{
                                        color: theme.palette.grey[300]
                                    }}
                                    isLoading={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <TotalStatBarChart />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={4}>
                <Grid item container direction="column" >
                <Grid item xs={12}>
                    <StatsGrid data={overallAnalytics} />
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    );
}

export default AdminDashboard;