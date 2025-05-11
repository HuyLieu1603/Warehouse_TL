// src/components/Layout/DashboardLayout.js
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../assets/styles/component/sidebar.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav
          className="custom-sidebar col-md-2 d-none d-md-block sidebar border-end min-vh-100"
          style={{ paddingTop: "1rem" }}
        >
          <Sidebar />
        </nav>

        {/* Main Content */}
        <main className="col-md-10 ms-sm-auto px-4">
          <Header />
          <div className="pt-3">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
