import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * 主题管理Hook
 * 处理深色/浅色主题的切换和持久化
 * 
 * @returns {Object} 主题相关的状态和方法
 */
export const useTheme = () => {
  // 使用localStorage存储主题偏好
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme', false);

  // 当主题改变时更新body的class
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  /**
   * 切换主题模式
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleTheme };
}; 