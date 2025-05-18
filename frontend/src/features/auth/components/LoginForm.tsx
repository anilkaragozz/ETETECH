import { Form, Input, Button, message } from "antd";
import { useLogin } from "@/services/mutations/useLogin";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "@/types";
import { AxiosError } from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const loginMutation = useLogin();

  const onFinish = async (values: LoginRequest) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        const token = data.accessToken;
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
        navigate("/dashboard");
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
      className="space-y-6 min-h-[300px]"
      autoComplete="off"
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "E-mail is required!" },
          { type: "email", message: "Please enter valid e-mail!" },
        ]}
      >
        <Input placeholder="example@site.com" />
      </Form.Item>

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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
