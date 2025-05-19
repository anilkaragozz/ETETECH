import { Layout, Menu, Button } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

import { useAuthStore } from "@/store/auth";

const { Header, Content } = Layout;

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    navigate("/auth");
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between px-6">
        <div className="flex items-center w-full justify-between">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            className="flex-1 bg-inherit"
          >
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/companies">
              <Link to="/companies">Companies</Link>
            </Menu.Item>
            <Menu.Item key="/products">
              <Link to="/products">Products</Link>
            </Menu.Item>
          </Menu>

          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginLeft: "auto", color: "white" }}
          >
            Logout
          </Button>
        </div>
      </Header>

      <Content className="p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
