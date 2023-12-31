import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import Donut from './Donut'



const LineChart = () => {


    const [state, setState] = useState({
        options: {
            series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41]
            }],
            chart: {
                height: 350,
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
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        }


    })
    const chartOptions = {
        chart: {
            id: 'basic-bar',
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May'],
        },
    };

    const chartSeries = [
        {
            name: 'Monthly Sales',
            data: [12, 19, 3, 5, 2],
        },
    ];



    return (
        <>
            <div className='row my-2 py-4'>
                <div id="chart" className='col-6'>
                    <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
                </div>
                
                <div id="chart" className='col-6'>
                    <Donut />
                </div>
            </div>
        </>
    )

}
export default LineChart;
