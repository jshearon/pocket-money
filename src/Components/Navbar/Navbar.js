import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = (props) => <React.Fragment>
  <Link to="/dashboard" className="navbar1 d-flex flex-column justify-content-center align-items-center nav-item"><i className="fas fa-tachometer-alt"></i><p>Dashboard</p></Link>
  <Link to="/wishlist" className="navbar2 d-flex flex-column justify-content-center align-items-center nav-item"><i className="fas fa-clipboard-list"></i><p>Wishlist</p></Link>
  <Link to="/jobs" className="navbar3 d-flex flex-column justify-content-center align-items-center nav-item"><i className="fas fa-broom"></i><p>Jobs</p></Link>
  {
    props.user
    && <Link to={`/ledger/${props.user.id}`} className="navbar4 d-flex flex-column justify-content-center align-items-center nav-item">
        <i className="fas fa-cash-register"></i><p>Ledger</p>
       </Link>
  }
  </React.Fragment>;

export default Navbar;
