import React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  Descriptions,
  Divider,
} from "antd";
import AppLayout from "../../components/AppLayout"; // 👈 Import the layout

const { Title } = Typography;

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Updated values:", values);
    // TODO: Send update API request
  };

  return (
    <AppLayout>
      <Card style={{ maxWidth: 900, margin: ".5rem auto" }}>
        <Title level={2}>Your Profile</Title>

        <Descriptions bordered column={1} style={{ marginBottom: "2rem" }}>
          <Descriptions.Item label="Name">
            {user?.name || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {user?.email || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item
            label="Role"
            style={{ textTransform: "capitalize" }}
          >
            {user?.role || "N/A"}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Edit Info</Divider>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          initialValues={user}
        >
          <Form.Item name="name" label="Name">
            <Input placeholder="Your name" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Info
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </AppLayout>
  );
};

export default UserProfile;
