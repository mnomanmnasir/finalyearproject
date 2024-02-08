import React from 'react'
import Navbar from '../components/Navbar';
import Chart from './Charts'
import Tables from './Table';
import '../styles/sidebar.css'
import CardWithChart from './CardChart'




const Dashboard = () => {
    return (

        <div className='px-3'>
            <CardWithChart />
            <Chart />
            <Tables />

        </div>
    )
}

export default Dashboard;   