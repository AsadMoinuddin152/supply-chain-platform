import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./components/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserList from "./pages/UserManagement/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manager"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
