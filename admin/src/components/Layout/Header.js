// src/components/Layout/Header.js
import React from "react";

const Header = () => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
      <h1 className="h4">Dashboard</h1>
      <div className="d-flex gap-3 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          style={{ width: "200px" }}
        />
        <img
          src="https://i.pravatar.cc/30"
          alt="User"
          className="rounded-circle"
        />
      </div>
    </div>
  );
};

export default Header;
