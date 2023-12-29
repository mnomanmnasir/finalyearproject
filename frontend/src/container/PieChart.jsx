import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const Donut = () => {
  const [state, setState] = useState({
    options: {
      labels: ['Team A', 'Team B', 'Team C', 'Team D'],
      chart: {
        type: 'donut',
        width: '380',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: 'Pie Chart'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
    series: [44, 55, 13, 33],
  });

  return (
    <>


      <div className='d-flex justify-content-center mt-5'>
        <Chart className='mt-5' options={state.options} series={state.series} type="donut" width="580" />
      </div>
    </>
  );
};

export default Donut;
