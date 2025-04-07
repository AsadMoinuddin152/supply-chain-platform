import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Space,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { loginAPI } from "../../api/api";

const { Title } = Typography;

const Login = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nextStep = () => {
    form
      .validateFields([step === 0 ? "email" : "password"])
      .then(() => setStep(step + 1))
      .catch(() => {});
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await loginAPI(values);
      const role = response.role?.toLowerCase();

      dispatch(
        loginSuccess({
          token: response.token,
          user: {
            _id: response._id,
            name: response.name,
            email: response.email,
            role: response.role,
          },
          lastLoginTime: Date.now(),
        })
      );

      notification.success({
        message: "Login Success",
        description: `Welcome back, ${response.name}`,
        placement: "topRight",
        duration: 3,
      });

      setTimeout(() => {
        navigate(`/dashboard/${role}`);
      }, 500);
    } catch (error) {
      message.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card
        title={
          <Title level={isMobile ? 4 : isTablet ? 3 : 2}>
            Login to Dashboard
          </Title>
        }
        className="login-card"
      >
        <Form
          form={form}
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {(!isMobile || step === 0) && (
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your email"
                type="email"
              />
            </Form.Item>
          )}

          {(!isMobile || step === 1) && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>
          )}

          <Form.Item>
            {isMobile ? (
              <Space style={{ width: "100%" }}>
                {step === 0 && (
                  <Button type="primary" block onClick={nextStep}>
                    Next
                  </Button>
                )}
                {step === 1 && (
                  <>
                    <Button onClick={prevStep} block disabled={loading}>
                      Back
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      Log In
                    </Button>
                  </>
                )}
              </Space>
            ) : (
              <Button type="primary" htmlType="submit" block loading={loading}>
                Log In
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
