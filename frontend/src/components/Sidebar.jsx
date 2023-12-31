
import React, { useEffect } from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { BiShoppingBag, BiPackage, BiArchive, BiTrafficCone, BiMessageAltEdit, BiSupport, BiLogoProductHunt, BiSolidUserAccount, BiPieChart, BiPurchaseTag, BiCube, BiCart } from 'react-icons/bi';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa'

const Sidebar = () => {

    return (
        <div className="sidebar h-100" style={{}}>
            <div className='d-flex m-3'>
                <BiCube className="bi my-1 me-2 fs-3" />
                <span className="brand-name fs-4">WMS</span>
            </div>
            <hr className="text-dark" />
            <div className="list-group list-group-flush">
                <Link to='/' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <MdOutlineDashboard className="bi my-1 me-2 fs-5" />
                    <span>Dashboard</span>
                </Link>
                <Link to='warehouse' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiPurchaseTag className="fs-5 me-2 my-1 bi" />
                    {/* <BiSolidDashboard className="bi my-1 me-2 fs-5"/> */}
                    <span >Warehouse</span>
                </Link>

                <Link to='user' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <FaUserFriends
                        className="bi my-1 me-2 fs-5" />

                    <span >User</span>
                </Link>
                <Link to='customers' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiMessageAltEdit className="bi my-1 me-2 fs-5" />
                    <span >Customers</span>
                </Link>

                <Link to='products' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiLogoProductHunt className="bi-outline my-1 me-2 fs-5" />
                    <span >Products</span>
                </Link>
                <Link to='suppliers' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiSupport className="bi my-1 me-2 fs-5" />
                    <span >Suppliers</span>
                </Link>
                <Link to='sales' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiShoppingBag className='me-2 fs-5' />
                    <span >Sales</span>
                </Link>
                <Link to='carrier' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiTrafficCone className='bi my-1 me-2 fs-5' />
                    <span >Carriers</span>
                </Link>
                <Link to='inventory' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiArchive className='bi my-1 me-2 fs-5' />
                    <span >Inventory</span>
                </Link>
                <Link to='orders' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiCart className='bi my-1 me-2 fs-5' />
                    <span >Orders</span>
                </Link>
                <Link to='purchase' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiShoppingBag className="fs-5 me-3" />
                    <span >Purchase</span>
                </Link>

                {/* <Link to='piechart' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiPieChart className="fs-5 me-3" />
                    <span>Pie Chart</span>
                </Link> */}
                <Link to='shipments' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiPackage className="fs-5 me-3" />
                    <span>Shipments</span>
                </Link>
                {/* <Link to='barchart' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiBarChart className="fs-5 me-3" />
                    <span>Bar Chart</span>
                </Link>
                <Link to='linechart' className="list-group-item list-group-item-action d-flex align-items-center my-2 py-2">
                    <BiBarChart className="fs-5 me-3" />
                    <span >Line Chart</span>
                </Link> */}
            </div>
        </div>
    );
};

export default Sidebar;
