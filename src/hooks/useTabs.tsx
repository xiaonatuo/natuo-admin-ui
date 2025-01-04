import { ReactNode } from 'react';
import { TabItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

/**
 * 根据标签页key生成对应的内容组件
 * @param {string} key - 标签页的唯一标识
 * @returns {ReactNode} 对应的React节点内容
 */
const generateTabContent = (key: string): ReactNode => {
  switch (key) {
    case 'dashboard':
      return <div key="dashboard">仪表盘内容</div>;
    default:
      return <div key={key}>{key} 内容</div>;
  }
};

/**
 * 存储在localStorage中的标签页数据结构
 * @interface StoredTabItem
 * @property {string} key - 标签页的唯一标识
 * @property {string} label - 标签页显示的文本
 */
interface StoredTabItem {
  key: string;
  label: string;
}

// 默认的标签页配置
const DEFAULT_TABS: StoredTabItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
  }
];

/**
 * 标签页管理Hook
 * 处理标签页的状态管理、本地存储和相关操作
 * 
 * @returns {Object} 标签页相关的状态和方法
 */
export const useTabs = () => {
  // 使用localStorage持久化存储标签页状态
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'dashboard');
  const [storedTabs, setStoredTabs] = useLocalStorage('openTabs', DEFAULT_TABS);
  const [collapsed, setCollapsed] = useLocalStorage('siderCollapsed', false);

  // 将存储的标签数据转换为完整的TabItem（包含内容）
  const openTabs: TabItem[] = storedTabs.map(tab => ({
    ...tab,
    content: generateTabContent(tab.key)
  }));

  /**
   * 处理标签页切换
   * @param {string} key - 目标标签页的key
   */
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  /**
   * 处理标签页编辑（关闭）
   * @param {string} targetKey - 目标标签页的key
   * @param {'add' | 'remove'} action - 编辑动作类型
   */
  const handleTabEdit = (targetKey: any, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const newTabs = storedTabs.filter(tab => tab.key !== targetKey);
      setStoredTabs(newTabs);
      if (activeTab === targetKey) {
        setActiveTab(newTabs[newTabs.length - 1]?.key || '');
      }
    }
  };

  /**
   * 设置打开的标签页
   * @param {TabItem[]} tabs - 新的标签页数组
   */
  const setOpenTabs = (tabs: TabItem[]) => {
    // 只存储 key 和 label
    const newStoredTabs = tabs.map(({ key, label }) => ({ key, label }));
    setStoredTabs(newStoredTabs);
  };

  return {
    activeTab,
    openTabs,
    collapsed,
    setActiveTab,
    setOpenTabs,
    setCollapsed,
    handleTabChange,
    handleTabEdit
  };
}; 