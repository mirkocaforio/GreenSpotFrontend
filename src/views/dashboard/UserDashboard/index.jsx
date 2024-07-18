import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../../store/constant";
import CustomCard from "../components/CustomCard";
import {roundValue} from "../../../utils/math";
import {AccessTimeTwoTone, OfflineBoltTwoTone} from "@mui/icons-material";
import {IconCpu2} from "@tabler/icons-react";
import UserAnalyticsAreaChart from "../components/UserAnalyticsAreaChart";
import UserPaymentChartCard from "../components/UserPaymentChartCard";
import UserStatsGrid from "../components/UserStatsGrid";
import UserDashboardSkeleton from "../../../ui-component/cards/Skeleton/UserDashboardSkeleton";

export const UserDashboard = () => {
    const theme = useTheme();

    const {userAnalytics} = useSelector(state => state.analytics);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userAnalytics) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [userAnalytics]);

    return (
        <>

                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <CustomCard
                                            customSx={{
                                                bgcolor: 'warning.dark',
                                            }}
                                            textSx={{
                                                color: 'warning.light'
                                            }}
                                            title={"Total Energy Saved"}
                                            currentValue={roundValue(userAnalytics?.energySaved,3) + " kWh"}
                                            previousValue={""}
                                            icon={OfflineBoltTwoTone}
                                            iconSx={{
                                                color: theme.palette.warning.light
                                            }}
                                            isLoading={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <CustomCard
                                            customSx={{
                                                bgcolor: 'secondary.main',
                                            }}
                                            textSx={{
                                                color: 'primary.light'
                                            }}
                                            title={"Computing Power Used"}
                                            currentValue={roundValue(userAnalytics?.computingPowerUsed,2) + ""}
                                            previousValue={""}
                                            icon={IconCpu2}
                                            iconSx={{
                                                color: theme.palette.grey[300]
                                            }}
                                            isLoading={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <CustomCard
                                            customSx={{
                                                bgcolor: 'primary.dark',
                                            }}
                                            textSx={{
                                                color: 'primary.light'
                                            }}
                                            title={"Total Task Working Time"}
                                            currentValue={roundValue(userAnalytics?.timeSpentOnTasks,2) + " min"}
                                            previousValue={""}
                                            icon={AccessTimeTwoTone}
                                            iconSx={{
                                                color: theme.palette.grey[300]
                                            }}
                                            isLoading={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={8}>
                                        <UserAnalyticsAreaChart/>
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} lg={4}>
                                        <Grid item container direction="column" spacing={2} >
                                            <Grid item xs={12}>
                                                <UserStatsGrid userStats={userAnalytics}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <UserPaymentChartCard/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

        </>
    );
}

export default UserDashboard;