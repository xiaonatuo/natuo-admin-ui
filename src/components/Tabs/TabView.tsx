import { Tabs } from 'antd';
import { TabItem } from '../../types';

/**
 * TabView组件的属性接口
 * @interface TabViewProps
 * @property {string} activeKey - 当前激活的标签页的key
 * @property {TabItem[]} tabs - 标签页数据数组
 * @property {Function} onChange - 标签页切换时的回调函数
 * @property {Function} onEdit - 标签页编辑（关闭）时的回调函数
 */
interface TabViewProps {
  activeKey: string;
  tabs: TabItem[];
  onChange: (key: string) => void;
  onEdit: (targetKey: any, action: 'add' | 'remove') => void;
}

/**
 * 标签页视图组件
 * 用于显示和管理多标签页界面
 * 
 * @component TabView
 * @param {TabViewProps} props - 组件属性
 * @returns {JSX.Element} 渲染的标签页组件
 */
export const TabView: React.FC<TabViewProps> = ({
  activeKey,
  tabs,
  onChange,
  onEdit
}) => {
  // 将TabItem数组转换为Ant Design Tabs需要的格式
  const items = tabs.map(tab => ({
    key: tab.key,          // 标签页的唯一标识
    label: tab.label,      // 标签页显示的文本
    closable: tab.key !== 'dashboard'  // 仪表盘标签页不可关闭，其他可关闭
  }));

  return (
    <div className="tabs-container">
      <Tabs
        activeKey={activeKey}        // 当前激活的标签页
        type="editable-card"         // 可编辑的卡片式标签页
        onChange={onChange}          // 切换标签页的回调
        onEdit={onEdit}             // 关闭标签页的回调
        items={items}               // 标签页配置项
        hideAdd                     // 隐藏添加按钮
      />
    </div>
  );
}; 