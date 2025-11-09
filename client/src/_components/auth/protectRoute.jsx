import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ user, allowedRole = "student", redirect = "/" }) => {
  console.log("i am protenct",user)
  if (!user) {
    // If no user logged in, redirect to login
    return <Navigate to={redirect} replace />;
  }

  // Check if the user's role matches the allowed role
  if (user?.userRole!=undefined && allowedRole && user?.userRole !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authorized, show child routes
  return <Outlet />;
};

export default ProtectRoute;
