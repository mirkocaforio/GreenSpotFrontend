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
import {useSelector} from "react-redux";
import {roundValue} from "../../../utils/math";
import SmallInfoCard from "./SmallInfoCard";
import {AccessTimeTwoTone, OfflineBoltTwoTone} from "@mui/icons-material";

export const convertToApexChartData = (data, mapping) => {
    const categories = data.map(item => `${item.year}-${item.month}-${item.day}`);
    const series = mapping.map(field => ({
        name: field.displayName,
        data: data.map(item => roundValue(item[field?.fieldName],2))
    }));

    // Calculate total sums for fields with Total: true
    const totals = mapping.reduce((acc, field) => {
        if (field?.total) {
            acc[field.fieldName] = {
                title: "Total " + field.displayName,
                value: roundValue(data.reduce((sum, item) => sum + item[field.fieldName], 0),2),
            }
        }
        return acc;
    }, {});

    return { categories, series, totals };
}

const status = [
    {
        value: 'daily',
        label: 'This Month'
    },
    {
        value: 'year',
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
    const [value, setValue] = useState('daily');

    const [isLoading, setIsLoading] = useState(true);

    const { overallAnalytics } = useSelector(state => state.analytics);
    const [chartSettings, setChartSettings] = useState(initSettings);
    const [totals, setTotals] = useState({});

    const theme = useTheme();
    const chartRef = useRef(null);
    const [init, setInit] = useState(false);

    const { primary } = theme.palette.text;
    const divider = theme.palette.divider;
    const grey500 = theme.palette.grey[500];


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fieldMapping = [
        { displayName: 'Energy Consumed', fieldName: 'energyConsumed',
            total: true,
            icon: OfflineBoltTwoTone,
            iconSx: {
                color: theme.palette.warning.main
            },
            textColor: theme.palette.warning.dark,
            bgColor: 'warning.light',
            initialVisibility: true },
        { displayName: 'Computing Power Used', fieldName: 'computingPowerUsed',initialVisibility: false },
        { displayName: 'Active Member Count', fieldName: 'activeMemberCount',initialVisibility: true },
        { displayName: 'Active User Count', fieldName: 'activeUserCount',initialVisibility: true },
        { displayName: 'Tasks Submitted', fieldName: 'tasksSubmitted',initialVisibility: true },
        { displayName: 'Tasks Completed', fieldName: 'tasksCompleted',initialVisibility: true },
        { displayName: 'Work Minutes', fieldName: 'workMinutes',
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


        if(overallAnalytics && overallAnalytics[value]){
            setIsLoading(false);
            chartData = convertToApexChartData(overallAnalytics[value].data, fieldMapping);
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
            setInit(false);
        }else {
            setIsLoading(true);
        }

    }, [overallAnalytics, value]);

    // ############################## - Chart visibility - ##############################
    useEffect(() => {
        if (chartRef.current && !init) {
            fieldMapping.forEach((field) => {
                if (!field.initialVisibility && chartRef.current) {
                    chartRef.current.chart.toggleSeries(field.displayName);
                }
            });
            setInit(true);
        }
    }, [fieldMapping, init, chartRef]);


    return (
        <>
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container justifyContent="flex-start" direction="row" spacing={2}>
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
                                    <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
                                    <Chart ref={chartRef} options={chartSettings.options} series={chartSettings.series}  type={"bar"} height={480} />
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
