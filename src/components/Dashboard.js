import React from "react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "30%", backgroundColor: "red", height: "100vh" }}>
        <Link
          to="/dashboard/addStudent"
          style={{ textDecoration: "none", display: "block", color: "white" }}
        >
          Add student
        </Link>
        <Link
          to="/dashboard/studentList"
          style={{ textDecoration: "none", display: "block", color: "white" }}
        >
          Student List
        </Link>
        <Link
          to="/dashboard/addFaculty"
          style={{ textDecoration: "none", display: "block", color: "white" }}
        >
          Add Faculty
        </Link>
        <Link
          to="/dashboard/facultyList"
          style={{ textDecoration: "none", display: "block", color: "white" }}
        >
          Faculty List
        </Link>
      </div>
      <div style={{ width: "70%", backgroundColor: "green", height: "100vh" }}>
        {/*  the Outlet component is a special component that is used in conjunction with nested routes. It serves as a placeholder where the child routes of a parent route will be rendered. */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
