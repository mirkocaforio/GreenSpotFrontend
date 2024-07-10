// ==============================|| DASHBOARD - BAJAJ AREA CHART ||============================== //

const chartData = {
  type: 'area',
  height: 95,
  options: {
    chart: {
      id: 'payment-chart',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Income '
        }
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      data: []
    }
  ]
};

export default chartData;
