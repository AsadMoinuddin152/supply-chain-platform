import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  Typography,
  Spin,
} from "antd";
import { useSelector } from "react-redux";
import { getUsersAPI, deleteUserAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import UserAnalytics from './UserAnalytics';

const { Title, Text } = Typography;

const UserList = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getUsersAPI(token);
      setUsers(data);
    } catch (err) {
      message.error("Failed to fetch users");
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserAPI(token, id);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      message.error("Failed to delete user");
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AppLayout>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            User Management
          </Title>
          <Button
            type="primary"
            onClick={() => navigate("/admin/users/create")}
          >
            Create New User
          </Button>
        </div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
           <UserAnalytics users={users} />
            <Row gutter={[16, 16]}>
            {users.map((user) => (
              <Col key={user._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={user.name}
                  bordered
                  actions={[
                    <Button
                      type="link"
                      onClick={() => navigate(`/admin/users/view/${user._id}`)}
                    >
                      View Details
                    </Button>,
                    <Popconfirm
                      title="Delete this user?"
                      onConfirm={() => handleDelete(user._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" danger>
                        Delete
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <Text type="secondary">Email:</Text>
                  <div>{user.email}</div>
                  <Text type="secondary">Role:</Text>
                  <div>{user.role}</div>
                </Card>
              </Col>
            ))}
          </Row>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default UserList;
