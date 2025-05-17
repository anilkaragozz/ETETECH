import { Form, Input, Button, message } from "antd";
import axiosClient from "@/libs/axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values: {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Form values:", values);
    try {
      await axiosClient.post("/auth/register", values);
      message.success("Kayıt başarılı, şimdi giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error) {
      console.error("Kayıt başarısız", error);
      message.error("Kayıt başarısız.");
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="space-y-6"
    >
      <Form.Item
        label="Ad"
        name="name"
        rules={[{ required: true, message: "İsim zorunludur" }]}
      >
        <Input placeholder="Adınız" />
      </Form.Item>

      <Form.Item
        label="Soyad"
        name="surname"
        rules={[{ required: true, message: "Soyad zorunludur" }]}
      >
        <Input placeholder="Soyadınız" />
      </Form.Item>

      <Form.Item
        label="E-posta"
        name="email"
        rules={[
          { required: true, message: "E-posta zorunludur" },
          { type: "email", message: "Geçerli bir e-posta girin" },
        ]}
      >
        <Input placeholder="ornek@site.com" />
      </Form.Item>

      <Form.Item
        label="Şifre"
        name="password"
        rules={[
          { required: true, message: "Şifre zorunludur" },
          { min: 6, message: "Şifre en az 6 karakter olmalı" },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="••••••" />
      </Form.Item>

      <Form.Item
        label="Şifreyi Onayla"
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Lütfen şifrenizi tekrar girin" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Şifreler eşleşmiyor"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="••••••" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Kayıt Ol
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
