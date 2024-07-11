import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../../../store/constant";
import MainCard from "../../../ui-component/cards/MainCard";
import CustomCard from "../components/CustomCard";
import {roundValue} from "../../../utils/math";
import {AccessTimeTwoTone, OfflineBoltTwoTone} from "@mui/icons-material";
import { IconCpu2 } from '@tabler/icons-react';
import MemberAnalyticsAreaChart from "../components/MemberAnalyticsAreaChart";

export const MemberDashboard = () => {
    const theme = useTheme();

    const {memberAnalytics} = useSelector(state => state.analytics);
    //const {memberListAnalytics} = useSelector(state => state.analytics);
    //const {transactionMemberAnalytics} = useSelector(state => state.analytics);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (memberAnalytics) {
            //console.log(memberAnalytics);
            //console.log(memberListAnalytics);
            //console.log(transactionMemberAnalytics);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [memberAnalytics]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12} sm={12} lg={12}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CustomCard
                            customSx={{
                                bgcolor: 'warning.dark',
                            }}
                            textSx={{
                                color: 'warning.light'
                            }}
                            title={"Total Energy Sold"}
                            currentValue={roundValue(memberAnalytics?.energyConsumed,3) + " kWh"}
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
                                bgcolor: 'success.dark',
                            }}
                            textSx={{
                                color: 'primary.light'
                            }}
                            title={"Total Computing Power"}
                            currentValue={roundValue(memberAnalytics?.computingPower,2) + ""}
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
                            title={"Total Resources Work"}
                            currentValue={roundValue(memberAnalytics?.workMinutes,2) + " min"}
                            previousValue={""}
                            icon={AccessTimeTwoTone}
                            iconSx={{
                                color: theme.palette.grey[300]
                            }}
                            isLoading={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MemberAnalyticsAreaChart/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MemberDashboard;