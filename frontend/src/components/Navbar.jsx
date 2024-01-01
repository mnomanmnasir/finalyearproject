import React, { useEffect } from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatarImage from '../assests/avatarImg.png';
import { Link } from 'react-router-dom';
// import { useAuth } from '../container/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaChevronDown } from 'react-icons/fa';
import Cookies from 'js-cookie';


const Navbar = ({ Toggle, onLogout }) => {

  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <nav className="navbar navbar-expand-sm navbar-dark px-2">
      <i className="navbar-brand bi bi-justify-left fs-4 text-black" data-aos="fade-right" data-aos-easing="linear" data-aos-duration="300" onClick={Toggle}></i>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <div className='d-flex'>
              {/* <h5 className='my-1 mx-3 border border-rounded-circle'>hello</h5> */}
              <div class="border border-secondary py-1 px-2 mb-1 mx-2 rounded-pill border-opacity-25">{Cookies.get("name")}</div>
              <img
                src={avatarImage}
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: '30px', height: '30px' }}
              />
              <Link to='#'
                className="nav-link dropdown-toggle text-white"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FaChevronDown className="fs-0 text-dark" style={{ cursor: 'pointer' }} />
              </Link>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId">
                {/* <Link to='' className="dropdown-item">Profile</Link> */}
                <Link to='signIn' className="dropdown-item" onClick={onLogout}>Logout</Link>
                {/* <Link to='' className="dropdown-item">Logout</Link> */}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;