import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ admin, children }: any) => {
  const { IsLoggedIn, role } = useSelector((state: any) => state?.auth);
  if (!IsLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  if (admin && role === "admin") {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoutes;
