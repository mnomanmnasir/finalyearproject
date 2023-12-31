import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import '../styles/cardchart.css'
// import { BsArrowUp } from 'react-icons/bs';
import AOS from 'aos';
import 'aos/dist/aos.css';


const CardWithChart = () => {

    useEffect(() => {

        AOS.init();
    }, []);


    return (
        <div className="container-fluid">
            <div className="row g-3 my-2">
                <div className="col-md-3">
                    <div data-aos="flip-right" data-aos-easing="linear" data-aos-duration="600" className="p-3 bg-green d-flex justify-content-around align-items-center shadow-sm rounded">
                        <div>
                            <h3 className='fs-2'>
                                230
                            </h3>
                            <h3 className='fs-5'>
                                Products
                            </h3>
                        </div>
                        <i className="bi bi-cart-plus p-3 fs-1"></i>
                    </div>
                </div>
                <div className="col-md-3">
                    <div data-aos="flip-right" data-aos-easing="linear" data-aos-duration="700" className="p-3 bg-orange shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                2450
                            </h3>
                            <h3 className='fs-5'>
                                Sales
                            </h3>
                        </div>
                        <i className="bi bi-currency-dollar p-3 fs-1"></i>

                    </div>
                </div>
                <div className="col-md-3">
                    <div data-aos="flip-right" data-aos-easing="linear" data-aos-duration="800" className="p-3 bg-pink shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                2250
                            </h3>
                            <h3 className='fs-5'>
                                Delivery
                            </h3>
                        </div>
                        <i className="bi bi-truck p-3 fs-1"></i>
                    </div>
                </div>
                <div className="col-md-3">
                    <div data-aos="flip-right" data-aos-easing="linear" data-aos-duration="900" className="p-3 bg-aqua shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                80%
                            </h3>
                            <h3 className='fs-5'>
                                Increase
                            </h3>
                        </div>
                        <i className="bi bi-graph-up-arrow p-3 fs-1"></i>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default CardWithChart;
