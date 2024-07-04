import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from '../chart-data/total-growth-bar-chart';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalStatBarChart = ({ isLoading }) => {
    const [value, setValue] = React.useState('today');
    const theme = useTheme();
    let isCancelled = false;
    const chartUpdated = React.useRef(false);

    const { primary } = theme.palette.text;
    const divider = theme.palette.divider;
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    const data = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            },
            responsive: [
                {
                    //breakpoint: 480,
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
        series: [{
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        },{
            name: 'series-2',
            data: [10, 20, 15, 30, 29, 40, 50, 71, 105]
        },{
            name: 'series-3',
            data: [20, 30, 25, 40, 39, 50, 60, 81, 115]
        },{
            name: 'series-4',
            data: [40, 50, 45, 60, 59, 70, 80, 101, 135]
        }
        ]
    }

    React.useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
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
        };

        // do not load chart when loading
        if (!isLoading && !isCancelled && !chartUpdated.current) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
            chartUpdated.current = true;
        }

        return () => {
            isCancelled = true;
        };


    }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, divider, isLoading, grey500]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Growth</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">$2,324.00</Typography>
                                        </Grid>
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
                                    <Chart options={data.options} series={data.series} type={"bar"} height={480} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalStatBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalStatBarChart;
