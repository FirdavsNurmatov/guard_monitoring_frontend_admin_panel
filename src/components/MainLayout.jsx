import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

export default function MainLayout() {
  const location = useLocation();

  // location.pathname — hozirgi sahifa yo‘li, masalan: /dashboard
  const selectedKey = (() => {
    if (location.pathname.startsWith("/object")) return "1";
    if (location.pathname.startsWith("/users")) return "2";
    // if (location.pathname.startsWith("/events")) return "4";
    return "";
  })();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // bu yerda `selectedKey` ishlatilmoqda
          items={[
            {
              key: "1",
              icon: <TagsOutlined />,
              label: <Link to="/object">Change map image</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            // {
            //   key: "4",
            //   icon: <CalendarOutlined />,
            //   label: <Link to="/events">Events</Link>,
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
