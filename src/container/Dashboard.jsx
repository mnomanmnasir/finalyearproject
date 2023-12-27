import React from 'react'
import Navbar from '../components/Navbar';
import Chart from './Charts'
import PopUp from './Modal';
import Tables from './Table';
import '../styles/sidebar.css'
import CardWithChart from './CardChart'




const Dashboard = ({ Toggle }) => {
    return (

        <div className='px-3'>
            <Navbar Toggle={Toggle} />
            <CardWithChart />
            <Chart />
            <Tables />
            <PopUp />
        </div>
    )
}

export default Dashboard;   