export const chartOptions = (props) => {
    const currentColor = '#527EE8';
    const customSize = window.innerWidth > 770 ? window.innerWidth/2-200 : window.innerWidth-100;
    const options = {
      chart: {
        width: '100%', //customSize>600 ? 600 : customSize,
        height: 220,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: !props.small,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: props.label,
          data: props.data,
        },
      ],
      fill: {
        colors: [currentColor],
      },
      yaxis: {
        show: !props.small,
        labels: {
          show: true,
          offsetX: -10,
          formatter: (value) => {
            return value >= 1000 ? value / 1000 + 'k' : value;
          },
        },
      },
      xaxis: {
        categories: props.header,
        labels: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        tooltip: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: !props.small,
      },
    };
  
    return options;
  };
  