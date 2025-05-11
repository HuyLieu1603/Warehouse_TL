// src/components/Layout/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <h5 className="text-primary text-center">Tú Linh's Warehouse</h5>
      <ul className="nav flex-column mb-4">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wallet">
            My Wallet
          </Link>
        </li>
      </ul>

      <h6 className="text-secondary">Service</h6>
      <ul className="nav flex-column mb-4">
        <li className="nav-item">
          <Link className="nav-link" to="/transactions">
            Transactions
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/rewards">
            Rewards
          </Link>
        </li>
      </ul>

      <h6 className="text-secondary">Account</h6>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/settings">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-outline-danger btn-sm mt-2">
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
