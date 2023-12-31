
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import User from './container/User';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import Sales from './container/Sales'
import Inventory from './container/Inventory'
import BarChart from './container/BarChart';
import Purchase from './container/Purchase'
import PieChart from './container/PieChart';
import LineChart from './container/LineChart';
import Navbar from './components/Navbar';
import SignIn from './container/SignIn'
import { useAuth } from './container/AuthContext';
import Product from './container/Product';
import Warehouse from './container/Warehouse';
import Supplier from './container/Supplier';
import Carrier from './container/Carrier';
import Customer from './container/Customer';
import Order from './container/Order';
import Shipment from './container/Shipment';

export const baseUrl = "http://localhost:8080/api/v1";

const App = () => {

  const { authenticated, logout } = useAuth();
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    setToggle(false); // Hide the sidebar on logout
    logout();
    // Additional logout logic if needed
  };

  return (
    <>
      <Router>
        <div className="container-fluid bg-light">
          <div className="row">
            {toggle && (
              <div className="col-2 bg-white">
                <Sidebar onLogout={handleLogout} />
              </div>
            )}
            <div className={`col-${!toggle ? '12' : '10'}`}>
              {authenticated && <Navbar Toggle={Toggle} onLogout={handleLogout} />}
              <Routes>
                <Route path="/" element={<Dashboard Toggle={Toggle} />} />
                <Route path="/user" element={<User Toggle={Toggle} />} />
                <Route path="/customers" element={<Customer Toggle={Toggle} />} />
                <Route path="/products" element={<Product Toggle={Toggle} />} />
                <Route path="/suppliers" element={<Supplier Toggle={Toggle} />} />
                <Route path="/warehouse" element={<Warehouse Toggle={Toggle} />} />
                <Route path="/carrier" element={<Carrier Toggle={Toggle} />} />
                <Route path="/sales" element={<Sales Toggle={Toggle} />}></Route>
                <Route path="/inventory" element={<Inventory Toggle={Toggle} />}></Route>
                <Route path="/orders" element={<Order Toggle={Toggle} />}></Route>
                <Route path="/shipments" element={<Shipment Toggle={Toggle} />}></Route>
                <Route path="/purchase" element={<Purchase Toggle={Toggle} />}></Route>
                <Route path="/barchart" element={<BarChart Toggle={Toggle} />}></Route>
                <Route path="/piechart" element={<PieChart Toggle={Toggle} />}></Route>
                <Route path="/linechart" element={<LineChart Toggle={Toggle} />}></Route>
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/logout" element={<Navigate to="/signIn" />} />
                {!authenticated && <Route path="/signIn" element={<SignIn />} />}
                {!authenticated && <Route path="/logout" element={<Navigate to="/signIn" />} />}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;

