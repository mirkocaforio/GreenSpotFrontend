import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import {IconCoins} from '@tabler/icons-react';
import {useDispatch} from "react-redux";
import {getTransactionMemberAnalytics, getTransactionUserAnalytics} from "../../actions/analytics";
import {roundValue} from "../../utils/math";

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

export const initialSettings = {
    type: 'line',
    height: 90,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {},
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: () => 'Earnings'
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: []
}


const TimeEarningCard = ({isLoading, title, transactionAnalytics, role}) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [timeValue, setTimeValue] = useState("month");
    const [transactionData, setTransactionData] = useState(transactionAnalytics);
    const [chartSettings, setChartSettings] = useState(initialSettings);
    const [averageValues, setAverageValues] = useState([]);

    useEffect(() => {
        if (transactionData && transactionData.length) {
            const chartData = convertToApexChartData(transactionData, 'totalOrder');
            setChartSettings(chartSettings => ({
                ...chartSettings,
                series: chartData.series
            }));
        }
    }, [transactionData]);

    const convertToApexChartData = (data, field) => {
        const series = [{
            name: field,
            data: data.map(item => roundValue(item.totalAmount, 2))
        }];

        setAverageValues(data);

        return { series };
    }

    const calculateAverages = (averageValues) => {
        return (averageValues.reduce((acc, item) => acc + item.totalAmount, 0) / averageValues.length).toFixed(2);
    };

    const handleChangeTime = (value) => {
        setTimeValue(value);
        const date = new Date();
        let fetchTransactionData;

        if (role === 'user') {
            fetchTransactionData = dispatch(
                getTransactionUserAnalytics(
                    1,
                    date.getFullYear(),
                    value
                )
            )
        } else if (role === 'member') {
            fetchTransactionData = dispatch(
                getTransactionMemberAnalytics(
                    1,
                    date.getFullYear(),
                    value
                )
            )
        }

        if (fetchTransactionData) {
            fetchTransactionData.then((data) => {
                setTransactionData(data);
                setChartSettings(chartSettings => ({
                    ...chartSettings,
                    series: convertToApexChartData(data, 'totalOrder').series
                }));

            }).catch((error) => {
                console.error("Failed to fetch transaction data:", error);
            });
        }
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard/>
            ) : (
                <MainCard
                    border={false}
                    content={false}
                    sx={{
                        bgcolor: 'primary.dark',
                        color: '#fff',
                        overflow: 'hidden',
                        position: 'relative',
                        '&>div': {
                            position: 'relative',
                            zIndex: 5
                        },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.primary[800],
                            borderRadius: '50%',
                            top: {xs: -105, sm: -85},
                            right: {xs: -140, sm: -95}
                        },
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.primary[800],
                            borderRadius: '50%',
                            top: {xs: -155, sm: -125},
                            right: {xs: -70, sm: -15},
                            opacity: 0.5
                        }
                    }}
                >
                    <Box sx={{p: 2.25}}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                bgcolor: 'primary.800',
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <IconCoins fontSize="inherit"/>
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            variant={timeValue === 'day' ? 'contained' : 'text'}
                                            size="small"
                                            sx={{color: 'inherit'}}
                                            onClick={() => handleChangeTime('day')}
                                        >
                                            Daily
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={timeValue === 'month' ? 'contained' : 'text'}
                                            size="small"
                                            sx={{color: 'inherit'}}
                                            onClick={() => handleChangeTime('month')}
                                        >
                                            Monthly
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={timeValue === 'year' ? 'contained' : 'text'}
                                            size="small"
                                            sx={{color: 'inherit'}}
                                            onClick={() => handleChangeTime('year')}
                                        >
                                            Yearly
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{mb: 0.75}}>
                                <Grid container alignItems="center">
                                    <Grid item xs={4}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Typography
                                                    sx={{
                                                        fontSize: '2.125rem',
                                                        fontWeight: 500,
                                                        mr: 1,
                                                        mt: 1.75,
                                                        mb: 0.75
                                                    }}
                                                >
                                                    {calculateAverages(averageValues)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: 'primary.200'
                                                    }}
                                                >
                                                    {title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {/*getChartData(timeValue)*/}
                                        <Chart options={chartSettings.options} series={chartSettings.series} type={chartSettings.type} height={chartSettings.height} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </MainCard>
            )}
        </>
    );
};

TimeEarningCard.propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    transactionAnalytics: PropTypes.array,
    role: PropTypes.string
};

export default TimeEarningCard;
