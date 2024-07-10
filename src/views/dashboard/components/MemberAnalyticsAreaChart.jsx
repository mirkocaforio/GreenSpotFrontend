import MainCard from "../../../ui-component/cards/MainCard";
import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import SkeletonBarChart from "../../../ui-component/cards/Skeleton/BarChart";
import Chart from "react-apexcharts";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {getMemberListAnalytics} from "../../../actions/analytics";

const initialSettings = {
    options: {
        chart: {
            height: 400,
            type: 'area'
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
        colors: ['#ffae00', '#00a135', '#007fff'],
    },
    series: []
};

const status = [
    {
        value: 'day',
        label: 'Daily'
    },
    {
        value: 'month',
        label: 'Monthly'
    },
    {
        value: 'year',
        label: 'Yearly'
    }
];

export const MemberAnalyticsAreaChart = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const {memberListAnalytics} = useSelector(state => state.analytics);
    const chartRef = useRef(null);

    const [value, setValue] = useState('month');
    const [memberData, setMemberData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartSettings, setChartSettings] = useState(initialSettings);

    const fieldMapping = [
        { displayName: 'Total Energy Sold (kWh)', fieldName: 'totalEnergySold', initialVisibility: true },
        { displayName: 'Total Computing Power Sold', fieldName: 'totalComputingPowerSold',initialVisibility: false },
        { displayName: 'Total Work Minutes (min)', fieldName: 'totalWorkMinutes',initialVisibility: false }
    ];

    const categoryMapper = (item) => {
        const day = item.day !== 0 ? String(item.day).padStart(2, '0') : '01';
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
        if (memberListAnalytics) {
            console.log(memberListAnalytics)
            setIsLoading(false);
            setMemberData(memberListAnalytics);
        } else {
            setIsLoading(true);
        }
    }, [memberListAnalytics]);

    useEffect(() => {
        if (memberData && memberData.length) {
            const chartData = convertToApexChartData(memberData, fieldMapping);
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
        }
    }, [fieldMapping, memberData]);

    const handleChangeValue = (value) => {
        setValue(value);
        const date = new Date();
        let fetchMemberAnalyticsData = dispatch(getMemberListAnalytics(1, date.getFullYear(), value));

        if (fetchMemberAnalyticsData) {
            fetchMemberAnalyticsData.then((data) => {
                setMemberData(data);
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

    return (
        <MainCard
            title={"Analytics Details"}
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
                            <SkeletonBarChart/>
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
                                <div className={theme.typography.chartWrapper}>
                                    <Chart
                                        ref={chartRef}
                                        {...chartSettings}
                                        type={initialSettings.options.chart.type}
                                        height={initialSettings.options.chart.height}
                                    />
                                </div>
                            </div>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default MemberAnalyticsAreaChart;