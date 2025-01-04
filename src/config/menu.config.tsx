import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import { MenuItem } from '../types';

/**
 * 应用的主导航菜单配置
 * 定义了整个应用的导航结构，包括：
 * - 仪表盘
 * - 用户管理（包含子菜单）
 * - 系统设置（包含子菜单）
 * 
 * @constant menuItems
 * @type {MenuItem[]}
 */
export const menuItems: MenuItem[] = [
  /**
   * 仪表盘菜单项
   * 作为应用的首页和默认页面
   */
  {
    key: 'dashboard',
    icon: <HomeOutlined /> as ReactNode,
    label: '仪表盘',
  },
  /**
   * 用户管理菜单组
   * 包含用户列表和用户组两个子菜单
   */
  {
    key: 'user',
    icon: <UserOutlined /> as ReactNode,
    label: '用户管理',
    children: [
      {
        key: 'user-list',
        label: '用户列表',
      },
      {
        key: 'user-group',
        label: '用户组',
      },
    ],
  },
  /**
   * 系统设置菜单组
   * 包含系统配置和权限管理两个子菜单
   */
  {
    key: 'settings',
    icon: <SettingOutlined /> as ReactNode,
    label: '系统设置',
    children: [
      {
        key: 'system',
        label: '系统配置',
      },
      {
        key: 'permission',
        label: '权限管理',
      },
    ],
  },
]; 