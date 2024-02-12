
// // import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Sidebar from './components/Sidebar';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import User from './container/User';
// import { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Dashboard from './container/Dashboard';
// import Sales from './container/Sales'
// import Inventory from './container/Inventory'
// import BarChart from './container/BarChart';
// import Purchase from './container/Purchase'
// import PieChart from './container/PieChart';
// import LineChart from './container/LineChart';
// import Navbar from './components/Navbar';
// import SignIn from './container/SignIn'
// import { useAuth } from './container/AuthContext';
// import Product from './container/Product';
// import Warehouse from './container/Warehouse';
// import Supplier from './container/Supplier';
// import Carrier from './container/Carrier';
// import Customer from './container/Customer';
// import Order from './container/Order';
// import Shipment from './container/Shipment';
// import ProtectedRoute from './container/PrivateRoute';

// export const baseUrl = "http://localhost:8080/api/v1";

// const App = () => {

//   const { authenticated, logout } = useAuth();
//   const [toggle, setToggle] = useState(true);

//   const Toggle = () => {
//     setToggle(!toggle);
//   };

//   const handleLogout = () => {
//     setToggle(false); // Hide the sidebar on logout
//     logout();
//     // Additional logout logic if needed
//   };

//   return (
//     <>
//       <Router>
//         <div className="container-fluid bg-light">
//           <Routes>
//             <Route element={<ProtectedRoute />}>
//               <div className="row">
//                 {toggle && (
//                   <div className="col-2 bg-white">
//                     <Sidebar onLogout={handleLogout} />
//                   </div>
//                 )}
//                 <div className={`col-${!toggle ? '12' : '10'}`}>
//                   <Navbar Toggle={Toggle} onLogout={handleLogout} />
//                   <Route path="/" element={<Dashboard Toggle={Toggle} />} />
//                   <Route path="/user" element={<User Toggle={Toggle} />} />
//                   <Route path="/customers" element={<Customer Toggle={Toggle} />} />
//                   <Route path="/products" element={<Product Toggle={Toggle} />} />
//                   <Route path="/suppliers" element={<Supplier Toggle={Toggle} />} />
//                   <Route path="/warehouse" element={<Warehouse Toggle={Toggle} />} />
//                   <Route path="/carrier" element={<Carrier Toggle={Toggle} />} />
//                   <Route path="/sales" element={<Sales Toggle={Toggle} />}></Route>
//                   <Route path="/inventory" element={<Inventory Toggle={Toggle} />}></Route>
//                   <Route path="/orders" element={<Order Toggle={Toggle} />}></Route>
//                   <Route path="/shipments" element={<Shipment Toggle={Toggle} />}></Route>
//                   <Route path="/purchase" element={<Purchase Toggle={Toggle} />}></Route>
//                   <Route path="/barchart" element={<BarChart Toggle={Toggle} />}></Route>
//                   <Route path="/piechart" element={<PieChart Toggle={Toggle} />}></Route>
//                   <Route path="/linechart" element={<LineChart Toggle={Toggle} />}></Route>
//                 </div>
//               </div>
//             </Route>
//             <Route path="/signIn" element={<SignIn />} />
//             <Route path="/logout" element={<Navigate to="/signIn" />} />
//           </Routes>
//         </div>
//       </Router >
//     </>
//   );
// }

// export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './container/AuthContext';
import ProtectedRoute from './container/PrivateRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './container/Dashboard';
import Sales from './container/Sales';
import Inventory from './container/Inventory';
import BarChart from './container/BarChart';
import Purchase from './container/Purchase';
import PieChart from './container/PieChart';
import LineChart from './container/LineChart';
import SignIn from './container/SignIn';
import Product from './container/Product';
import Warehouse from './container/Warehouse';
import Supplier from './container/Supplier';
import Carrier from './container/Carrier';
import Customer from './container/Customer';
import Order from './container/Order';
import Shipment from './container/Shipment';
import User from './container/User';
import Layout from './container/Layout';
import Putaway from './container/Putaway';

export const baseUrl = "http://localhost:8080/api/v1";

// const App = () => {
//   const { authenticated, logout } = useAuth();
//   const [toggle, setToggle] = useState(true);

//   const Toggle = () => {
//     setToggle(!toggle);
//   };

//   const handleLogout = () => {
//     setToggle(false); // Hide the sidebar on logout
//     logout();
//     // Additional logout logic if needed
//   };

//   return (
//     <Router>
//       <div className="container-fluid bg-light">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <div className="row">
//                   {toggle && (
//                     <div className="col-2 bg-white">
//                       <Sidebar onLogout={handleLogout} />
//                     </div>
//                   )}
//                   <div className={`col-${!toggle ? '12' : '10'}`}>
//                     <Navbar Toggle={Toggle} onLogout={handleLogout} />
//                     <Route index element={<Dashboard Toggle={Toggle} />} />
//                     <Route path="/user" element={<User Toggle={Toggle} />} />
//                     <Route path="/customers" element={<Customer Toggle={Toggle} />} />
//                     <Route path="/products" element={<Product Toggle={Toggle} />} />
//                     <Route path="/suppliers" element={<Supplier Toggle={Toggle} />} />
//                     <Route path="/warehouse" element={<Warehouse Toggle={Toggle} />} />
//                     <Route path="/carrier" element={<Carrier Toggle={Toggle} />} />
//                     <Route path="/sales" element={<Sales Toggle={Toggle} />} />
//                     <Route path="/inventory" element={<Inventory Toggle={Toggle} />} />
//                     <Route path="/orders" element={<Order Toggle={Toggle} />} />
//                     <Route path="/shipments" element={<Shipment Toggle={Toggle} />} />
//                     <Route path="/purchase" element={<Purchase Toggle={Toggle} />} />
//                     <Route path="/barchart" element={<BarChart Toggle={Toggle} />} />
//                     <Route path="/piechart" element={<PieChart Toggle={Toggle} />} />
//                     <Route path="/linechart" element={<LineChart Toggle={Toggle} />} />
//                   </div>
//                 </div>
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/signIn" element={<SignIn />} />
//           <Route path="/login" element={<SignIn />} />
//           <Route path="/logout" element={<Navigate to="/signIn" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
const App = () => {
  const { authenticated, logout } = useAuth();
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  
return (
  <Router>
    {/* <div className="container-fluid bg-light"> */}
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Layout toggle={toggle} Toggle={Toggle} ><Dashboard Toggle={Toggle} /></Layout>} />
        <Route path="/user" element={<Layout toggle={toggle} Toggle={Toggle} ><User Toggle={Toggle} /></Layout>} />
        <Route path="/customers" element={<Layout toggle={toggle} Toggle={Toggle} ><Customer Toggle={Toggle} /></Layout>} />
        <Route path="/products" element={<Layout toggle={toggle} Toggle={Toggle} ><Product Toggle={Toggle} /></Layout>} />
        <Route path="/suppliers" element={<Layout toggle={toggle} Toggle={Toggle} ><Supplier Toggle={Toggle} /></Layout>} />
        <Route path="/warehouse" element={<Layout toggle={toggle} Toggle={Toggle} ><Warehouse Toggle={Toggle} /></Layout>} />
        <Route path="/carrier" element={<Layout toggle={toggle} Toggle={Toggle} ><Carrier Toggle={Toggle} /></Layout>} />
        <Route path="/sales" element={<Layout toggle={toggle} Toggle={Toggle} ><Sales Toggle={Toggle} /></Layout>} />
        <Route path="/inventory" element={<Layout toggle={toggle} Toggle={Toggle} ><Inventory Toggle={Toggle} /></Layout>} />
        <Route path="/orders" element={<Layout toggle={toggle} Toggle={Toggle} ><Order Toggle={Toggle} /></Layout>} />
        <Route path="/shipments" element={<Layout toggle={toggle} Toggle={Toggle} ><Shipment Toggle={Toggle} /></Layout>} />
        <Route path="/putaways" element={<Layout toggle={toggle} Toggle={Toggle} ><Putaway Toggle={Toggle} /></Layout>} />
        <Route path="/purchase" element={<Layout toggle={toggle} Toggle={Toggle} ><Purchase Toggle={Toggle} /></Layout>} />
        <Route path="/barchart" element={<Layout toggle={toggle} Toggle={Toggle} ><BarChart Toggle={Toggle} /></Layout>} />
        <Route path="/piechart" element={<Layout toggle={toggle} Toggle={Toggle} ><PieChart Toggle={Toggle} /></Layout>} />
        <Route path="/linechart" element={<Layout toggle={toggle} Toggle={Toggle} ><LineChart Toggle={Toggle} /></Layout>} />
      </Route>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/logout" element={<Navigate to="/signIn" />} />
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
    {/* </div> */}
  </Router>
);
}

export default App;
