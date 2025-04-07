import React, { useState } from "react";
import { Layout, Button, Typography, Space, Drawer, Divider } from "antd";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Grid } from "antd";

const { Header } = Layout;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getMenuItems = () => {
    if (!user?.role) return [];

    const role = user.role.toLowerCase();

    switch (role) {
      case "admin":
        return [
          { label: "Dashboard", key: "/dashboard/admin" },
          { label: "Users", key: "/users" },
          { label: "Inventory", key: "/inventory" },
          { label: "Orders", key: "/orders" },
          { label: "Shipments", key: "/shipments" },
        ];
      case "manager":
        return [
          { label: "Dashboard", key: "/dashboard/manager" },
          { label: "Inventory", key: "/inventory" },
          { label: "Orders", key: "/orders" },
          { label: "Shipments", key: "/shipments" },
        ];
      case "employee":
        return [
          { label: "Dashboard", key: "/dashboard/employee" },
          { label: "My Orders", key: "/orders" },
        ];
      default:
        return [];
    }
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setDrawerVisible(false);
  };

  const menuItems = getMenuItems();

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 1.5rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
      }}
    >
      {/* Brand + Menu Button on Mobile */}
      <Space
        align="center"
        style={{
          flexDirection: "row-reverse",
        }}
      >
        <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
          SupplyChainPro
        </Title>

        {!screens.md && (
          <>
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setDrawerVisible(true)}
            />
            <Drawer
              title={
                <Text style={{ fontWeight: 600 }}>
                  Hello,{" "}
                  <Link to="/profile" style={{ fontWeight: 600 }}>
                    {user?.name || "User"}
                  </Link>
                </Text>
              }
              placement="left"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
              style={{ padding: "1rem" }}
            >
              {menuItems.map((item) => (
                <div key={item.key} style={{ marginBottom: "1rem" }}>
                  <Button
                    block
                    type={
                      location.pathname === item.key ? "primary" : "default"
                    }
                    onClick={() => handleMenuClick(item.key)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      height: "100%",
                      fontSize: 16,
                      borderRadius: "10px",
                      transition: "all 0.3s ease",
                      boxShadow:
                        location.pathname === item.key
                          ? "0 4px 12px rgba(24, 144, 255, 0.2)"
                          : "none",
                      background:
                        location.pathname === item.key
                          ? "linear-gradient(135deg, #1890ff, #40a9ff)"
                          : undefined,
                      color:
                        location.pathname === item.key ? "#fff" : undefined,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        location.pathname === item.key
                          ? "0 4px 12px rgba(24, 144, 255, 0.2)"
                          : "none";
                    }}
                  >
                    {item.label}
                  </Button>
                </div>
              ))}

              <Button
                block
                type="primary"
                icon={<LogoutOutlined />}
                danger
                onClick={handleLogout}
                style={{
                  padding: "0.75rem",
                  height: "3rem",
                  fontSize: 16,
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                  background: "linear-gradient(135deg, #ff4d4f, #ff7875)",
                  boxShadow: "0 4px 12px rgba(255, 77, 79, 0.2)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(255, 77, 79, 0.2)";
                }}
              >
                Logout
              </Button>
            </Drawer>
          </>
        )}
      </Space>

      {screens.md && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.key}
                style={{
                  textDecoration: "none",
                  color: location.pathname === item.key ? "#1677ff" : "#000",
                  fontWeight: location.pathname === item.key ? "bold" : 500,
                  padding: "4px 12px",
                  borderRadius: "6px",
                  backgroundColor:
                    location.pathname === item.key ? "#e6f4ff" : "transparent",
                  transition: "all 0.3s",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Text style={{ fontWeight: 500, whiteSpace: "nowrap" }}>
            <UserOutlined style={{ marginRight: 4 }} />
            <Link to="/profile" style={{ fontWeight: 600 }}>
              {user?.name || "User"}
            </Link>
          </Text>

          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </Header>
  );
};

export default Navbar;
