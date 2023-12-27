import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import User from './container/User';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import Customers from './container/Customer'
import Product from './container/Product'
import Login from './container/SignIn';
import SignUp from './container/SignUp'
import SignIn from './container/SignIn'
import Report from './container/Report'

const App = () => {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <Router>
      <div className="container-fluid bg-light">
        <div className="row">
          {toggle && (
            <div className="col-2 bg-white vh-100 postion-fixed">
              <Sidebar />
            </div>
          )}
          <div className="col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
              <Route path="/product" element={<Product />}></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route path="/customer" element={<Customers />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
