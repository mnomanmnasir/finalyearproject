import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "./AuthContext";

const Layout = ({ toggle, Toggle, children }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        Toggle(); // Hide the sidebar on logout
        // logout();
        console.error('Log out Successfull click');
        if (logout()) {
            console.error('Log out Successfull');
            navigate('/');
        }
        // Additional logout logic if needed
    };
    return <>
        <div className="container-fluid bg-light">
            <div className="row">
                {toggle && (
                    <div className="col-2 bg-white">
                        <Sidebar onLogout={handleLogout} />
                    </div>
                )}
                <div className={`col-${!toggle ? '12' : '10'}`}>
                    <Navbar Toggle={Toggle} onLogout={handleLogout} />
                    {children}
                </div>
            </div>
        </div>
    </>
}
export default Layout;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';
// import { useAuth } from './AuthContext';
// import '../styles/Layout.css'; // Import the stylesheet where you defined the above CSS

// const Layout = ({ toggle, Toggle, children }) => {
//     const navigate = useNavigate();
//     const { logout } = useAuth();

//     const handleLogout = async () => {
//         Toggle(); // Hide the sidebar on logout
//         try {
//             await logout();
//             console.log('Log out Successful');
//             navigate('/');
//         } catch (error) {
//             console.error('Failed to log out', error);
//             // Handle errors if logout fails
//         }
//     };

//     return (
//         <div className="container-fluid bg-light">
//             <div className="row">
//                 <div className={`col-2 bg-white sidebar ${toggle ? 'sidebar-visible' : 'sidebar-hidden'}`}>
//                     <Sidebar onLogout={handleLogout} />
//                 </div>
//                 <div className={`col ${toggle ? 'col-10' : 'col-12'}`}>
//                     <Navbar Toggle={Toggle} onLogout={handleLogout} />
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Layout;
