import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from '../chart-data/payments-chart';
import {convertToApexChartData} from "../../../utils/chart-utils";

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const PaymentChartCard = ({value}) => {
  const theme = useTheme();
  const orangeDark = theme.palette.secondary[800];

  //const customization = useSelector((state) => state.customization);
  //const { navType } = customization;

  const {paymentAdminAnalytics} = useSelector(state => state.analytics);

  const [curChartData, setChartData] = useState(chartData);

  const fieldMapping = [
    { displayName: 'Total Income', fieldName: 'totalAmount',initialVisibility: true }
  ]


  React.useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: { theme: 'light' }
    };

    if(paymentAdminAnalytics && value in paymentAdminAnalytics){
      const data = convertToApexChartData(paymentAdminAnalytics[value]?.data, fieldMapping, item => item.date);
      setChartData(curChartData => (
          {...curChartData,
            options: newSupportChart,
            series: data.series
          })
      )
    }

    ApexCharts.exec(`payment-chart`, 'updateOptions', newSupportChart);
  }, [ paymentAdminAnalytics, value]);

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: 'secondary.dark' }}>
                Total Income
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: 'grey.800' }}>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
          </Typography>
        </Grid>
      </Grid>
      <Chart {...curChartData} />
    </Card>
  );
};

PaymentChartCard.propTypes = {
  value: PropTypes.string
};

export default PaymentChartCard;
