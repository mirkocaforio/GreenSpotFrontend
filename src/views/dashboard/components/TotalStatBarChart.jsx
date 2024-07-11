import React, {useEffect, useRef, useState} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonBarChart from 'ui-component/cards/Skeleton/BarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import {useDispatch, useSelector} from "react-redux";
import SmallInfoCard from "./SmallInfoCard";
import {AccessTimeTwoTone, OfflineBoltTwoTone} from "@mui/icons-material";
import {getOverallAnalyticsList} from "../../../actions/analytics";
import useMediaQuery from "@mui/material/useMediaQuery";
import {convertToApexChartData} from "../../../utils/chart-utils";


const status = [
    {
        value: 'day',
        label: 'This Month'
    },
    {
        value: 'month',
        label: 'This Year'
    }
];

const initSettings = {
    options: {
        chart: {
            id: 'rec-stats-barChart',
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        xaxis: {
            categories: [],
        },
        legend: {
            show: true,
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        grid: {
            show: true
        },
        responsive: [
            {
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ]
    },
    series: []
}

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalStatBarChart = () => {
    const [value, setValue] = useState('day');

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const { overallAnalytics } = useSelector(state => state.analytics);
    const [chartSettings, setChartSettings] = useState(initSettings);
    const [totals, setTotals] = useState({});

    const theme = useTheme();
    const chartRef = useRef(null);
    const [init, setInit] = useState(false);
    const [created, setCreated] = useState(false);

    const { primary } = theme.palette.text;
    const divider = theme.palette.divider;
    const grey500 = theme.palette.grey[500];
    const breakMd = useMediaQuery(theme.breakpoints.down('md'));


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fieldMapping = [
        { displayName: 'Energy Consumed (kW/h)', fieldName: 'energyConsumed',
            total: true,
            icon: OfflineBoltTwoTone,
            iconSx: {
                color: theme.palette.warning.main
            },
            textColor: theme.palette.warning.light,
            bgColor: 'warning.dark',
            initialVisibility: true },
        { displayName: 'Computing Power Used',
            fieldName: 'computingPowerUsed',initialVisibility: false },
        { displayName: 'Active Member Count',
            fieldName: 'activeMemberCount',
            initialVisibility: true },
        { displayName: 'Active User Count',
            fieldName: 'activeUserCount',
            initialVisibility: true },
        { displayName: 'Tasks Submitted',
            fieldName: 'tasksSubmitted',initialVisibility: true },
        { displayName: 'Tasks Completed',
            fieldName: 'tasksCompleted',initialVisibility: true },
        { displayName: 'Work Minutes (min)',
            fieldName: 'workMinutes',
            total: true,
            icon: AccessTimeTwoTone,
            iconSx: {
                color: theme.palette.grey[300]
            },
            textColor: theme.palette.primary.light,
            bgColor: 'primary.dark',
            initialVisibility: false },
    ];

    // ############################## - Chart data & Chart settings - ##############################
    useEffect(() => {
        let chartData = {};


        if(overallAnalytics && value in overallAnalytics && overallAnalytics[value]){
            setIsLoading(false);

            const categoryMapper = item => item.day !== 0 ? `${item.year}-${item.month}-${item.day}` : `${item.year}-${item.month}`;
            chartData = convertToApexChartData(overallAnalytics[value]?.data, fieldMapping, categoryMapper);
            setChartSettings(chartSettings => ({
                ...chartSettings,
                options: {
                    ...chartSettings.options,
                    xaxis: {
                        categories: chartData.categories,
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: [primary]
                            }
                        }
                    },
                    grid: { borderColor: divider },
                    tooltip: { theme: 'light' },
                    legend: { labels: { colors: grey500 } }
                },
                series: chartData.series
            }));
            setTotals(chartData.totals);
            ApexCharts.exec(`rec-stats-barChart`, 'updateOptions', chartSettings);
            console.log("Setting created")
            setCreated(true);
        }else {
            setIsLoading(true);
        }

    }, [overallAnalytics, value]);

    // ############################## - Chart visibility - ##############################
    useEffect(() => {
        if (chartRef.current && !init && created) {
            console.log("Setting visibility");
            fieldMapping.forEach((field) => {
                if (!field.initialVisibility && chartRef.current) {
                    chartRef.current.chart.toggleSeries(field.displayName);
                }
            });
            setInit(true);
        }
    }, [ init,created]);

    // ############################## - Handle change event - ##############################
    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        if( overallAnalytics && !(value in overallAnalytics)){
            const date = new Date();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            dispatch(getOverallAnalyticsList(month, year, value));
            setCreated(false);
            setInit(false);
        }
    },[value]);

    return (
        <>
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                                <Grid item>
                                    <Grid container justifyContent="flex-start" direction={breakMd ? "column" : "row"} spacing={2}>
                                        {Object.keys(totals).map((key) => {
                                            const field = fieldMapping.find(field => field.fieldName === key);

                                            return (
                                                <Grid item key={key}>
                                                    <SmallInfoCard
                                                        customSx={{
                                                            bgcolor: field.bgColor,
                                                        }}
                                                        textSx={{
                                                            color: field.textColor
                                                        }}
                                                        title={field.displayName}
                                                        currentValue={totals[key].value}
                                                        icon={field.icon}
                                                        iconSx={field.iconSx}
                                                        isLoading={isLoading}
                                                    />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container justifyContent="flex-end" alignItems="center">
                                        <Grid item>
                                            <TextField id="standard-select-currency" select value={value} onChange={handleValueChange}>
                                                {status.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {isLoading ? (
                            <Grid item xs={12}>
                                <SkeletonBarChart />
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
                            <div className={theme.typography.chartContent}>
                                <div className={theme.typography.chartWrapper} >
                                    <Chart ref={chartRef} {...chartSettings}  type={"bar"} height={480} />
                                </div>
                            </div>
                        </Grid>
                        )}
                    </Grid>
                </MainCard>
        </>
    );
};

TotalStatBarChart.propTypes = {
};

export default TotalStatBarChart;
