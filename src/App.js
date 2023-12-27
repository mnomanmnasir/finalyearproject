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
              <Route path="/" element={<Dashboard Toggle={Toggle} />} />
              <Route path="/user" element={<User Toggle={Toggle}/>} />
              <Route path="/product" element={<Product Toggle={Toggle} />}></Route>
              <Route path="/report" element={<Report Toggle={Toggle} />}></Route>
              <Route path="/customer" element={<Customers Toggle={Toggle} />}></Route>
              <Route path="/login" element={<Login Toggle={Toggle} />}></Route>
              <Route path="/signup" element={<SignUp Toggle={Toggle} />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
