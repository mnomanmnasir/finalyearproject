import React from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { BiBarChart, BiPieChart, BiPurchaseTag } from 'react-icons/bi';


const Sidebar = () => {
    return (
        <div className="sidebar p-2 h-100 overflow-auto" style={{}}>
            <div className='d-flex m-3'>
                <i className="bi bi-search me-3 fs-4 "></i>
                <span className="brand-name fs-4">WMS</span>
            </div>
            <hr className="text-dark" />
            <div className="list-group list-group-flush">
                <Link to='/' className="list-group-item list-group-item-action d-flex align-items-center pb-3 ">
                    <i className="bi bi-speedometer2 fs-5 me-3"></i>
                    <span>Dashboard</span>
                </Link>
                <Link to='warehouse' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiPurchaseTag className="fs-5 me-3" />
                    <span >Warehouse</span>
                </Link>

                <Link to='user' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <i className="bi bi-house fs-5 me-3"></i>
                    <span >User</span>
                </Link>
                <Link to='customers' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <i className="bi bi-house fs-5 me-3"></i>
                    <span >Customers</span>
                </Link>
                <Link to='suppliers' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiPurchaseTag className="fs-5 me-3" />
                    <span >Suppliers</span>
                </Link>
                <Link to='products' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiPurchaseTag className="fs-5 me-3" />
                    <span >Products</span>
                </Link>

                <Link to='sales' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <i className="bi bi-table fs-5 me-3"></i>
                    <span >Sales</span>
                </Link>
                <Link to='carrier' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <i className="bi bi-table fs-5 me-3"></i>
                    <span >Carriers</span>
                </Link>
                <Link to='inventory' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <i className="bi bi-clipboard-data fs-5 me-3"></i>
                    <span >Inventory</span>
                </Link>
                <Link to='orders' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <i className="bi bi-clipboard-data fs-5 me-3"></i>
                    <span >Orders</span>
                </Link>
                <Link to='purchase' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiPurchaseTag className="fs-5 me-3" />
                    <span >Purchase</span>
                </Link>

                {/* <Link to='piechart' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiPieChart className="fs-5 me-3" />
                    <span>Pie Chart</span>
                </Link> */}
                <Link to='shipments' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiPieChart className="fs-5 me-3" />
                    <span>Shipments</span>
                </Link>
                {/* <Link to='barchart' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiBarChart className="fs-5 me-3" />
                    <span>Bar Chart</span>
                </Link>
                <Link to='linechart' className="list-group-item list-group-item-action d-flex align-items-center py-3 ">
                    <BiBarChart className="fs-5 me-3" />
                    <span >Line Chart</span>
                </Link> */}
            </div>
        </div>
    );
};

export default Sidebar;

