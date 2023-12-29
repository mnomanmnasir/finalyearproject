import React from 'react';
import 'bootstrap/js/dist/dropdown';
import avatarImage from '../assests/avatarImg.png';
import { Link } from 'react-router-dom';
// import { useAuth } from '../container/AuthContext';



const Navbar = ({ Toggle }) => {


  return (
    <nav className="navbar navbar-expand-sm navbar-dark px-2">
<i className="navbar-brand bi bi-justify-left fs-4 text-black" onClick={Toggle}></i>
      <button
        className="navbar-toggle d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <Link to=''
              className="nav-link dropdown-toggle text-white"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={avatarImage}
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: '30px', height: '30px', marginRight: '5px' }}
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId">
              {/* <Link to='' className="dropdown-item">Profile</Link> */}
              <Link to='signIn' className="dropdown-item">Logout</Link>
              {/* <Link to='' className="dropdown-item">Logout</Link> */}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
