import { Layout, Button, Breadcrumb, Dropdown, Avatar, MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BulbOutlined,
  BulbFilled,
  LogoutOutlined
} from '@ant-design/icons';

interface HeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  breadcrumbItems: { title: string }[];
}

export const Header: React.FC<HeaderProps> = ({
  collapsed,
  toggleCollapsed,
  isDarkMode,
  toggleTheme,
  breadcrumbItems
}) => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'theme',
      icon: isDarkMode ? <BulbFilled /> : <BulbOutlined />,
      label: isDarkMode ? '浅色模式' : '深色模式',
      onClick: toggleTheme,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        console.log('logout');
      },
    },
  ];

  return (
    <Layout.Header className="header">
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
        />
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="header-actions">
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
          arrow
        >
          <div className="user-dropdown">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="username">Admin User</span>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
}; 