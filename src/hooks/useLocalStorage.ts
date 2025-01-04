import { useState } from 'react';

/**
 * localStorage持久化存储Hook
 * 提供对localStorage的封装，支持任意类型的数据存储和读取
 * 
 * @template T 存储数据的类型
 * @param {string} key - localStorage的键名
 * @param {T} initialValue - 初始值
 * @returns {[T, (value: T | ((val: T) => T)) => void]} 存储的值和设置函数
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 获取初始值，优先从localStorage读取
  const getInitialValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getInitialValue);

  /**
   * 更新存储的值
   * @param {T | ((val: T) => T)} value - 新值或更新函数
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
} 