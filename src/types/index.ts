import type { ReactNode } from 'react';

/**
 * 标签页数据结构
 * @interface TabItem
 * @property {string} key - 标签页的唯一标识
 * @property {string} label - 标签页显示的文本
 * @property {ReactNode} content - 标签页的内容
 */
export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
}

/**
 * 菜单项数据结构
 * @interface MenuItem
 * @property {string} key - 菜单项的唯一标识
 * @property {ReactNode} icon - 菜单项的图标
 * @property {string} label - 菜单项显示的文本
 * @property {MenuItem[]} children - 子菜单项
 */
export interface MenuItem {
  key: string;
  icon?: ReactNode;
  label: string;
  children?: MenuItem[];
} 