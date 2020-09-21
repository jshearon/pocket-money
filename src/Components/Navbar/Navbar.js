import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => <React.Fragment>
  <Link to="/dashboard" className="navbar1"><i className="fas fa-tachometer-alt"></i></Link>
  <Link to="/wishlist" className="navbar2"><i className="fas fa-clipboard-list"></i></Link>
  <Link to="/jobs" className="navbar3"><i className="fas fa-broom"></i></Link>
  <Link to={props.user && `/ledger/${props.user.id}`} className="navbar4"><i className="fas fa-cash-register"></i></Link>
  <Link to="/goals" className="navbar5"><i className="fas fa-bullseye"></i></Link>
  </React.Fragment>;

export default Navbar;
