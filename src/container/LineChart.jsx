import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import Navbar from '../components/Navbar';



const LineChart = ({ Toggle }) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'line-chart',
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May'],
        },
    });

    const multiColorData = [
        { name: 'Series 1', data: [12, 5, 15, 5, 10], color: '#008FFB' },
        { name: 'Series 2', data: [5, 10, 3, 8, 6], color: '#00E396' },
        { name: 'Series 3', data: [8, 12, 6, 10, 5], color: '#CED4DC' },
    ];

    const chartSeries = multiColorData.map((series) => ({
        name: series.name,
        data: series.data,
        color: series.color,
    }));

    return (
        <>
            <Navbar Toggle={Toggle} />
            <div className='row my-2 py-4'>
                <h3>Line Chart</h3>
                {/* <div id="chart" className='col-6'> */}
                <Chart options={chartOptions} series={chartSeries} type="line" height={450} />
                {/* </div> */}
            </div>
        </>
    );
};

export default LineChart;
