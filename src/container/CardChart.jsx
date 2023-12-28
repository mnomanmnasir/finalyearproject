import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import '../styles/cardchart.css'
// import { BsArrowUp } from 'react-icons/bs';

const CardWithChart = () => {

    const [options, setOptions] = useState({
        chart: {
            height: 250,
            type: 'radialBar',
        },
        series: [30],
        labels: ['Progress'],

    });

    useEffect(() => {
        // Dynamically update chart options when the component mounts
        setOptions({
            chart: {
                height: 150,
                type: 'radialBar',
            },
            series: [70],
            labels: ['Progress'],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    },
                    dataLabels: {
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                            fontSize: '12px', // Adjust the font size as needed
                        },
                    },
                },
            },
        });
    }, []);


    return (
        <div className="container-fluid">
            <div className="row g-3 my-2">
                <div className="col-md-3">
                    <div className="p-3 bg-green shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                230
                            </h3>
                            <h3 className='fs-5'>
                                Products
                            </h3>
                        </div>
                        <ReactApexChart options={options} series={options.series} type="radialBar" height={150} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-orange shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                2450
                            </h3>
                            <h3 className='fs-5'>
                                Sales
                            </h3>
                        </div>
                        <ReactApexChart options={options} series={options.series} type="radialBar" height={150} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-pink shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                2250
                            </h3>
                            <h3 className='fs-5'>
                                Delivery
                            </h3>
                        </div>
                        <ReactApexChart options={options} series={options.series} type="radialBar" height={150} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-aqua shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                80%
                            </h3>
                            <h3 className='fs-5'>
                                Increase
                            </h3>
                        </div>
                        <ReactApexChart options={options} series={options.series} type="radialBar" height={150} />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CardWithChart;
