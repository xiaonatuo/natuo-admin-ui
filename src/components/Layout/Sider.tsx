import { Layout, Menu } from 'antd';
import { menuItems } from '../../config/menu.config';

/**
 * 侧边栏组件的属性接口
 * @interface SiderProps
 * @property {boolean} collapsed - 侧边栏是否折叠
 * @property {Function} onMenuClick - 菜单项点击回调
 * @property {string[]} selectedKeys - 当前选中的菜单项key数组
 */
interface SiderProps {
  collapsed: boolean;
  onMenuClick: (key: string) => void;
  selectedKeys: string[];
}

/**
 * 侧边栏组件
 * 显示应用的主导航菜单
 * 
 * @component Sider
 * @param {SiderProps} props - 组件属性
 * @returns {JSX.Element} 渲染的侧边栏组件
 */
export const Sider: React.FC<SiderProps> = ({
  collapsed,
  onMenuClick,
  selectedKeys
}) => {
  return (
    <Layout.Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      style={{
        background: 'white',
        borderRight: '1px solid rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="logo">
        <img src="/vite.svg" alt="logo" />
        {!collapsed && <h2>Ant Design X</h2>}
      </div>
      <div className="menu-container">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={['user', 'settings']}
          items={menuItems}
          onClick={({ key }) => onMenuClick(key)}
          theme="light"
        />
      </div>
    </Layout.Sider>
  );
}; 