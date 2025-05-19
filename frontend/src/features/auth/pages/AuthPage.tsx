import { Card, Tabs } from "antd";
import { useState } from "react";

import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";

const AuthPage = () => {
  const [activeKey, setActiveKey] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-[850px] max-w-3xl flex flex-col justify-center shadow-lg rounded-lg">
        <Tabs
          centered
          activeKey={activeKey}
          onChange={setActiveKey}
          items={[
            {
              key: "login",
              label: "Sign In",
              children: <LoginForm />,
            },
            {
              key: "register",
              label: "Sign Up",
              children: <RegisterForm />,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default AuthPage;
