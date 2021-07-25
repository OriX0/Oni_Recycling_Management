/*
 * @Description: 通用型hook工具
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState, useEffect, useRef, useCallback } from 'react';
export const useDebounce = <V>(value: V, wait: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, wait);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, wait]);
  return debounceValue;
};
