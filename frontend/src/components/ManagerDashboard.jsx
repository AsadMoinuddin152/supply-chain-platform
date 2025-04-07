// src/components/ManagerDashboard.jsx
import React from "react";
import AppLayout from "./AppLayout";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const ManagerDashboard = () => {
  return (
    <AppLayout>
      <Title level={2}>Manager Dashboard</Title>
      <Paragraph>
        Welcome Manager! You can manage inventory, place and track orders, and
        oversee shipments from here.
      </Paragraph>
    </AppLayout>
  );
};

export default ManagerDashboard;
