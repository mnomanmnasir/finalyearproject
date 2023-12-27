import React , {useState} from 'react';
import { Table } from 'react-bootstrap';
import AreaChart from 'react-apexcharts';


const Tables = () => {
    const [state, setState] = useState({
        options: {
            series: [{
                data: [400, 430, 448, 470, 540, 580, 690]
            }],
            chart: {
                type: 'bar',
                height: 350
            },
            annotations: {
                xaxis: [{
                    x: 500,
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            color: '#fff',
                            background: '#00E396',
                        },
                        text: 'X annotation',
                    }
                }],
                yaxis: [{
                    y: 'July',
                    y2: 'September',
                    label: {
                        text: 'Y annotation'
                    }
                }]
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            xaxis: {
                categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            yaxis: {
                reversed: true,
                axisTicks: {
                    show: true
                }
            }
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
        <div className='row my-3 m-2 py-4'>
            <div className='col-6'>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Tariq</td>
                            <td>Jamil</td>
                            <td>tariqjamil@gmail.com</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Ismail</td>
                            <td>Dada</td>
                            <td>ismaildada@gmail.com</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Ghais</td>
                            <td>Adil</td>
                            <td>ghaisadil@gmail.com</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>omama</td>
                            <td>khan</td>
                            <td>omamakhan@gmail.com</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Usman</td>
                            <td>Aleem</td>
                            <td>usmanaleem@gmail.com</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Usman</td>
                            <td>Aleem</td>
                            <td>usmanaleem@gmail.com</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Usman</td>
                            <td>Aleem</td>
                            <td>usmanaleem@gmail.com</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Usman</td>
                            <td>Aleem</td>
                            <td>usmanaleem@gmail.com</td>
                        </tr>
                        
                    </tbody>
                </Table>
            </div>
                <div id="chart" className='col'>
                    <AreaChart options={chartOptions} series={chartSeries} curve='smooth' height={350} />
                </div>

        </div>
    );  
};

export default Tables;
