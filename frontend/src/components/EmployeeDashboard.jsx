// src/components/EmployeeDashboard.jsx
import React from "react";

import { Typography } from "antd";
import AppLayout from "./AppLayout";

const { Title, Paragraph } = Typography;

const EmployeeDashboard = () => {
  return (
    <AppLayout>
      <Title level={2}>Employee Dashboard</Title>
      <Paragraph>
        Welcome! You can view your assigned orders and delivery tasks here. Keep
        things moving smoothly!
      </Paragraph>
    </AppLayout>
  );
};

export default EmployeeDashboard;
