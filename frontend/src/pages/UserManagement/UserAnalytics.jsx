// src/components/UserAnalytics.jsx
import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UserAnalytics = ({ users }) => {
  if (!users || users.length === 0) return null;

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(roleCounts).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  return (
    <>
      <Row gutter={16} style={{ marginBottom: "2rem" }}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Total Users" value={users.length} />
          </Card>
        </Col>
        {Object.entries(roleCounts).map(([role, count], i) => (
          <Col xs={24} md={8} key={i}>
            <Card>
              <Statistic title={role + "s"} value={count} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginBottom: "2rem" }}>
        <Col xs={24} md={12}>
          <Card title="Users by Role (Pie Chart)">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Users by Role (Bar Chart)">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserAnalytics;
