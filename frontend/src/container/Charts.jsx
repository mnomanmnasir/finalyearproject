// import React, { useState } from 'react';
// import Chart from 'react-apexcharts';
// import Donut from './Donut'



// const LineChart = () => {


//     const [state, setState] = useState({
//         options: {
//             series: [{
//                 name: 'series1',
//                 data: [31, 40, 28, 51, 42, 109, 100]
//             }, {
//                 name: 'series2',
//                 data: [11, 32, 45, 32, 34, 52, 41]
//             }],
//             chart: {
//                 height: 350,
//                 type: 'area'
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             stroke: {
//                 curve: 'smooth'
//             },
//             xaxis: {
//                 type: 'datetime',
//                 categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
//             },
//             tooltip: {
//                 x: {
//                     format: 'dd/MM/yy HH:mm'
//                 },
//             },
//         }


//     })
//     const chartOptions = {
//         chart: {
//             id: 'basic-bar',
//         },
//         xaxis: {
//             categories: ['January', 'February', 'March', 'April', 'May'],
//         },
//     };

//     const chartSeries = [
//         {
//             name: 'Monthly Sales',
//             data: [12, 19, 3, 5, 2],
//         },
//     ];



//     return (
//         <>
//             <div className='row m-2 py-4'>
//                 <div id="chart" className='col-6'>
//                     <div className='w-100 bg-white rounded p-3'>
//                         <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
//                     </div>
//                 </div>

//                 <div id="chart" className='col-6'>
//                     <div className='w-100 bg-white rounded p-3'>
//                         <Donut />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )

// }
// export default LineChart;



import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import Donut from './Donut'


const RadialProgressBar = ({ progressPercentage, overviewText }) => {
    const chartOptions = {
        series: [progressPercentage],
        chart: {
            height: 50,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%', // Set the inner circle size
                },
            },
        },
        labels: ['Progress'],
    };

    return (
        <div className='col-md-6 mt-3'>
            <div className='w-100 bg-white rounded p-0'>
            <div className="overview-text">
                    <p>{overviewText}</p>
                </div>
                <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height={150} />
            </div>
        </div>
    );
};

const LineChart = () => {
    const [progress1, setProgress1] = useState(25);
    const [progress2, setProgress2] = useState(50);
    const [progress3, setProgress3] = useState(75);
    const [progress4, setProgress4] = useState(100);

    return (
        <>
            <div className='row'>
                <div id="chart" className='col-6'>
                    {/* <div className="col-md-6">
                        <RadialProgressBar progressPercentage={progress1} />
                    </div> */}
                    <div className='d-flex justify-content-between bg-grey rounded py-0 mb-1'>
                        <RadialProgressBar overviewText='Overview 1' progressPercentage={progress1} />
                        <div className="mx-2"></div>
                        <RadialProgressBar progressPercentage={progress2} overviewText='Overview 2'  />
                        {/* <Chart options={chartOptions} series={chartSeries} type="area" height={350} /> */}
                    </div>
                    <div className='d-flex justify-content-between bg-grey rounded'>
                        <RadialProgressBar progressPercentage={progress3} overviewText='Overview 3' />
                        <div className="mx-2"></div>
                        <RadialProgressBar progressPercentage={progress4} overviewText='Overview 4'  />
                        {/* <Chart options={chartOptions} series={chartSeries} type="area" height={350} /> */}
                    </div>
                    {/* <RadialProgressBar progressPercentage={progress3} />
                        <RadialProgressBar progressPercentage={progress4} /> */}
                </div>

                <div id="chart" className='col-6 py-3'>
                    <div className='bg-white rounded'>
                        <Donut />
                    </div>
                </div>
            </div>

        </>
    );
};

export default LineChart;

