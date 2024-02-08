import React, { useState } from 'react';
import BarGraph from 'react-apexcharts';
import Navbar from '../components/Navbar';

const BarChart = ({ Toggle }) => {
    const [state, setState] = useState({
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May'],
            },
            yaxis: {
                title: {
                    text: 'Sales (in units)',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + ' units';
                    },
                },
            },
        },
    });

    const chartSeries = [
        {
            name: 'Series 1',
            data: [12, 19, 3, 5, 2],
            color: '#008FFB',
        },
        {
            name: 'Series 2',
            data: [30, 40, 45, 50, 60],
            color: '#00E396',
        },
        {
            name: 'Series 3',
            data: [8, 12, 6, 10, 5],
            color: '#CED4DC',
        },
    ];

    return (
        <>
            <Navbar Toggle={Toggle} />
            <div className='row my-2 py-4'>
                <h3>Bar Chart</h3>
                <div id='chart'>
                    <BarGraph options={state.options} series={chartSeries} type='bar' height={450} />
                </div>
            </div>
        </>
    );
};

export default BarChart;
