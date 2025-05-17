import { Form, Input, Button, message } from "antd";
import axiosClient from "@/libs/axios";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const res = await axiosClient.post("/auth/login", values);
      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      setAccessToken(token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      message.error("Giriş başarısız.");
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      className="space-y-6"
      autoComplete="off"
    >
      <Form.Item
        label="E-posta"
        name="email"
        rules={[
          { required: true, message: "E-posta gereklidir" },
          { type: "email", message: "Geçerli bir e-posta girin" },
        ]}
      >
        <Input placeholder="ornek@site.com" />
      </Form.Item>

      <Form.Item
        label="Şifre"
        name="password"
        rules={[
          { required: true, message: "Şifre gereklidir" },
          { min: 6, message: "Şifre en az 6 karakter olmalı" },
        ]}
      >
        <Input.Password placeholder="••••••" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Giriş Yap
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
