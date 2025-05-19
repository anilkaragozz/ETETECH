import { Form, Input, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import type { RegisterData } from "@/types";
import { useRegister } from "@/services/mutations/useRegister";

const RegisterForm = () => {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const onFinish = async (values: RegisterData) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        message.success("Registration successful. You can now login.");
        navigate("/auth");
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const msg = error.response?.data?.message || "Login failed.";
          message.error(msg);
        } else {
          message.error("An unexpected error occurred.");
        }
      },
    });
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="space-y-6 min-h-[300px]"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Name is required!" },
              { min: 2, message: "Name must be at least 2 characters!" },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              { required: true, message: "Surname is required!" },
              { min: 2, message: "Surname must be at least 2 characters!" },
            ]}
          >
            <Input placeholder="Surname" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "E-mail is required!" },
          { type: "email", message: "Please enter a valid e-mail!" },
        ]}
      >
        <Input placeholder="example@site.com" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please enter your password again" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password mismatch"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
