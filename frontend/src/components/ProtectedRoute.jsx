import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { message } from "antd";
import { logout } from "../redux/authSlice";

const TOKEN_EXPIRY_LIMIT = 24 * 60 * 60 * 1000;

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const lastLoginTime = useSelector((state) => state.auth.lastLoginTime);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (lastLoginTime && Date.now() - lastLoginTime > TOKEN_EXPIRY_LIMIT) {
    dispatch(logout());
    message.info("Session expired. Please log in again.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
