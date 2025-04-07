// src/components/AppLayout.jsx
import React from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ background: "#fff", padding: 24 }}>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
