import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// material-ui
import {useTheme} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third-party
import Chart from 'react-apexcharts';

// project imports
import {getPaymentUserAnalytics} from "../../../actions/analytics";
import MainCard from "../../../ui-component/cards/MainCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import MemberDashboardSkeleton from "../../../ui-component/cards/Skeleton/MemberDashboardSkeleton";
import SubCard from "../../../ui-component/cards/SubCard";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const initialSettings = {
    options: {
        chart: {
            height: 120,
            type: 'area',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: []
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {},
            marker: {
                show: false
            }
        }
    },
    series: []
};

const status = [
    {
        value: 'month',
        label: 'Monthly'
    },
    {
        value: 'year',
        label: 'Yearly'
    }
];

const UserPaymentChartCard = () => {
    const theme = useTheme();
    const green = theme.palette.secondary.main;

    const dispatch = useDispatch();

    const {paymentUserAnalytics} = useSelector(state => state.analytics);
    const chartRef = useRef(null);

    const [value, setValue] = useState('month');
    const [paymentUserData, setPaymentUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartSettings, setChartSettings] = useState(initialSettings);

    const fieldMapping = [
        { displayName: 'Total Payed', fieldName: 'totalAmount', initialVisibility: true }
    ];

    const categoryMapper = (item) => {
        const day = '01';
        const month = item.month !== 0 ? String(item.month).padStart(2, '0') : '01';
        return `${item.year}-${month}-${day}`;
    }

    const convertToApexChartData = (data, mapping) => {
        const categories = data.map(item => categoryMapper(item));

        const series = mapping.map(field => ({
            name: field.displayName,
            data: data.map(item => parseFloat(item[field?.fieldName].toFixed(2)))
        }));

        return {categories, series};
    }

    useEffect(() => {
        if (paymentUserAnalytics) {
            setIsLoading(false);
            setPaymentUserData(paymentUserAnalytics);
        } else {
            setIsLoading(true);
        }
    }, [paymentUserAnalytics]);

    useEffect(() => {
        if (paymentUserData && paymentUserData.length) {
            const chartData = convertToApexChartData(paymentUserData, fieldMapping);
            setChartSettings(chartSettings => ({
                ...chartSettings,
                options: {
                    ...chartSettings.options,
                    xaxis: {
                        categories: chartData.categories,
                    },
                    colors: [green],
                    tooltip: { theme: 'light' }
                },
                series: chartData.series
            }));
        }
    }, [fieldMapping, paymentUserData]);

    const handleChangeValue = (value) => {
        setValue(value);
        const date = new Date();
        let fetchPaymentUserData = dispatch(getPaymentUserAnalytics(1, date.getFullYear(), value));

        if (fetchPaymentUserData) {
            fetchPaymentUserData.then((data) => {
                setPaymentUserData(data);
                const chartData = convertToApexChartData(data, fieldMapping);
                setChartSettings(chartSettings => ({
                    ...chartSettings,
                    options: {
                        ...chartSettings.options,
                        xaxis: {
                            categories: chartData.categories,
                        }
                    },
                    series: chartData.series
                }));

            }).catch((error) => {
                console.error("Failed to fetch member data:", error);
            });
        }
    };

    const getDatePeriod = (item) => {
        if (item.month !== 0)
            return item.year + "-" + item.month
        return item.year
    }

    return (
        <MainCard
            title={"Finance Details"}
            secondary={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <TextField
                        id="standard-select-currency"
                        select
                        value={value}
                        onChange={(e) => handleChangeValue(e.target.value)}
                    >
                        {status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

            }
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {isLoading ? (
                        <Grid item xs={12}>
                            <MemberDashboardSkeleton/>
                        </Grid>
                    ) : (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                '& .apexcharts-menu.apexcharts-menu-open': {
                                    bgcolor: 'background.paper'
                                },
                                ...theme.typography.chart
                            }}
                        >
                            <SubCard title={"Total Payed"} sx={{ bgcolor: 'secondary.light' }}>
                                <Chart
                                    ref={chartRef}
                                    {...chartSettings}
                                    type={initialSettings.options.chart.type}
                                    height={initialSettings.options.chart.height}
                                />
                            </SubCard>
                        </Grid>
                    )}
                </Grid>
                {paymentUserData && paymentUserData?.map((item, index) => (
                    <Grid item xs={12} key={index}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {getDatePeriod(item)}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    € {item.totalAmount.toFixed(2)}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: '5px',
                                                        bgcolor: 'error.light',
                                                        color: 'error.dark',
                                                        ml: 2
                                                    }}
                                                >
                                                    <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 1.5 }} />
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

export default UserPaymentChartCard;
