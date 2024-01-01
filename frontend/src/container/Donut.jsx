import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['January', 'February', 'March', 'April', 'May'],
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
  };

  const chartSeries = [12, 19, 3, 5, 2];
  return (
    <>
      <div className='row my-2 py-5 m-3 p-5'>
        <Chart options={chartOptions} series={chartSeries} type="donut" width={400} />
      </div>
    </>
  )

}
export default LineChart;
