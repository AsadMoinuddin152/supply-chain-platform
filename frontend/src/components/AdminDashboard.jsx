// src/components/AdminDashboard.jsx
import React from "react";
import AppLayout from "./AppLayout";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AdminDashboard = () => {
  return (
    <AppLayout>
      <Title level={2}>Admin Dashboard</Title>
      <Paragraph>
        Welcome Admin! Here you can manage users, inventory, orders, shipments,
        and configure system settings.
      </Paragraph>
    </AppLayout>
  );
};

export default AdminDashboard;
