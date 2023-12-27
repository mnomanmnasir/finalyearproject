import React from 'react';
import Chart from 'react-apexcharts';
import Donut from './Donut'
const LineChart = () => {

    // const [state, setState] = useState({
    //     options: {
    //         series: [{
    //             data: [400, 430, 448, 470, 540, 580, 690]
    //         }],
    //         chart: {
    //             type: 'bar',
    //             height: 350
    //         },
    //         annotations: {
    //             xaxis: [{
    //                 x: 500,
    //                 borderColor: '#00E396',
    //                 label: {
    //                     borderColor: '#00E396',
    //                     style: {
    //                         color: '#fff',
    //                         background: '#00E396',
    //                     },
    //                     text: 'X annotation',
    //                 }
    //             }],
    //             yaxis: [{
    //                 y: 'July',
    //                 y2: 'September',
    //                 label: {
    //                     text: 'Y annotation'
    //                 }
    //             }]
    //         },
    //         plotOptions: {
    //             bar: {
    //                 horizontal: true,
    //             }
    //         },
    //         dataLabels: {
    //             enabled: true
    //         },
    //         xaxis: {
    //             categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //         },
    //         grid: {
    //             xaxis: {
    //                 lines: {
    //                     show: true
    //                 }
    //             }
    //         },
    //         yaxis: {
    //             reversed: true,
    //             axisTicks: {
    //                 show: true
    //             }
    //         }
    //     }

    // })
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
                    <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
                </div>

                <div id="chart" className='col-6'>
                    <Donut />
                </div>
            </div>
        </>
    )

}
export default LineChart;
