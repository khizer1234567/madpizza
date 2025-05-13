import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from '../Assets/logo.png';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div> 
      <h3>Welcome to the POS System</h3>
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <Link to="/pos" className="btn btn-outline-primary w-100">Go to POS</Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/cart" className="btn btn-outline-secondary w-100">View Cart</Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/orders" className="btn btn-outline-secondary w-100">Order History</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
