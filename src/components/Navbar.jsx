import React from 'react';
import 'bootstrap/js/dist/dropdown';
import avatarImage from '../assests/avatarImg.png'; // Replace with the actual path to your avatar image

const Navbar = ({ Toggle }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark px-2">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
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
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
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
            </a>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId">
              <a className="dropdown-item">Profile</a>
              <a className="dropdown-item">Setting</a>
              <a className="dropdown-item">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
