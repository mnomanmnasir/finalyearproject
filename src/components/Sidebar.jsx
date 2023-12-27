import React from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { BiSpeedometer2, BiHome, BiBarChartSquare } from 'react-icons/bi';
import Dashboard from '../container/Dashboard';


const Sidebar = () => {
    return (
        <div className="sidebar p-2">
            <div className='d-flex m-3'>
                <i className="bi bi-search me-3 fs-4 "></i>
                <span className="brand-name fs-4">WMS</span>
            </div>
            <hr className="text-dark" />
            {/* <Link to={'/home'} className="sidebar-item">
                <BiBarChartSquare />
                <span>Dashboard</span>
            </Link> */}
            <div className="list-group list-group-flush">
                <Link to='/' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <i className="bi bi-speedometer2 fs-5 me-3"></i>
                    <span className='fs-5'>Dashboard</span>
                </Link>

                <Link to='user' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <i className="bi bi-house fs-5 me-3"></i>
                    <span className='fs-5'>User</span>
                </Link>
                <Link to='product' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <i className="bi bi-table fs-5 me-3"></i>
                    <span className='fs-5'>Product</span>
                </Link>
                <Link to='report' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2" href='/report'>
                    <i className="bi bi-clipboard-data fs-5 me-3"></i>
                    <span className='fs-5'>Report</span>
                </Link>
                <Link to='customer' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2" href='/customer'>
                    <i className="bi bi-people fs-5 me-3"></i>
                    <span className='fs-5'>Customers</span>
                </Link>
              
              <Link to='login' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <i className="bi bi-power fs-5 me-3"></i>
                    <span className='fs-5'>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;

