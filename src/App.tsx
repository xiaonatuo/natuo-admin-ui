import { ConfigProvider, Layout, theme } from 'antd';
import { Header } from './components/Layout/Header';
import { Sider } from './components/Layout/Sider';
import { TabView } from './components/Tabs/TabView';
import { menuItems } from './config/menu.config';
import { useTabs } from './hooks/useTabs';
import { useTheme } from './hooks/useTheme';
import './styles/global.css';
import LoginPage from './components/Login/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;

/**
 * 应用程序主组件
 * 实现了整体布局和主要功能：
 * - 可折叠的侧边栏导航
 * - 多标签页管理
 * - 深色/浅色主题切换
 * - 面包屑导航
 * 
 * @component App
 * @returns {JSX.Element} 渲染的应用程序
 */
function App() {
  // 使用自定义Hook管理标签页状态
  const {
    activeTab,          // 当前激活的标签页
    openTabs,          // 打开的标签页列表
    collapsed,         // 侧边栏折叠状态
    setActiveTab,      // 设置当前标签页
    setOpenTabs,       // 更新标签页列表
    setCollapsed,      // 切换侧边栏状态
    handleTabChange,   // 标签页切换处理
    handleTabEdit      // 标签页编辑处理
  } = useTabs();
  
  // 使用自定义Hook管理主题状态
  const { isDarkMode, toggleTheme } = useTheme();

  /**
   * 处理菜单项点击事件
   * 如果点击的菜单项对应的标签页不存在，则创建新标签页
   * 
   * @param {string} key - 被点击的菜单项的key
   */
  const handleMenuClick = (key: string) => {
    if (!openTabs.find(tab => tab.key === key)) {
      // 查找菜单项的标签信息
      const menuLabel = menuItems.find(item => item.key === key)?.label || 
                       menuItems.flatMap(item => item.children || [])
                               .find(child => child?.key === key)?.label || 
                       key;
      
      // 创建新标签页
      setOpenTabs([...openTabs, {
        key,
        label: menuLabel,
        content: <div key={key}>{key} 内容</div>
      }]);
    }
    setActiveTab(key);
  };

  /**
   * 生成面包屑导航数据
   * 根据当前激活的标签页和菜单结构生成导航路径
   * 
   * @returns {Array<{title: string}>} 面包屑导航项数组
   */
  const getBreadcrumb = () => {
    const currentTab = openTabs.find(tab => tab.key === activeTab);
    if (!currentTab) return [];

    // 检查是否是顶级菜单
    const menuItem = menuItems.find(item => item.key === currentTab.key);
    if (menuItem) {
      return [{ title: menuItem.label }];
    }

    // 查找子菜单项
    for (const item of menuItems) {
      if (item.children) {
        const child = item.children.find(c => c.key === currentTab.key);
        if (child) {
          return [{ title: item.label }, { title: child.label }];
        }
      }
    }

    return [{ title: currentTab.label }];
  };

  // 创建受保护的路由组件
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
  };

  return (
    <AuthProvider>
      <Router>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              borderRadius: 4,
            },
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout className="layout">
                    {/* 侧边栏导航 */}
                    <Sider
                      collapsed={collapsed}
                      onMenuClick={handleMenuClick}
                      selectedKeys={[activeTab]}
                    />
                    <Layout>
                      {/* 顶部栏 */}
                      <Header
                        collapsed={collapsed}
                        toggleCollapsed={() => setCollapsed(!collapsed)}
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                        breadcrumbItems={getBreadcrumb()}
                      />
                      {/* 标签页导航 */}
                      <TabView
                        activeKey={activeTab}
                        tabs={openTabs}
                        onChange={handleTabChange}
                        onEdit={handleTabEdit}
                      />
                      {/* 内容区域 */}
                      <Content className="main-content">
                        {openTabs.find(tab => tab.key === activeTab)?.content || null}
                      </Content>
                    </Layout>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </ConfigProvider>
      </Router>
    </AuthProvider>
  );
}

export default App; 