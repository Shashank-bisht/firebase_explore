import React from "react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "30%", backgroundColor: "red", height: "100vh" }}>
       
        <Link style={{ textDecoration: "none", display: "block", color: "white" }}>Add student</Link>
        <Link style={{ textDecoration: "none", display: "block", color: "white" }}>Student List</Link>
      </div>
      <div style={{ width: "70%", backgroundColor: "green", height: "100vh" }}>
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
