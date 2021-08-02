/*
 * @Description: 通用型工具函数
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

export function generateMockDataArr<T>(
  mockLength: number,
  generateDataFn: (i: number) => T,
): T[] {
  const tempDataArr = [];
  for (let i = 0; i < mockLength; i++) {
    tempDataArr.push(generateDataFn(i));
  }
  return tempDataArr;
}

export function delay(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
export const isFalse = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';
export const cleanObj = (detailObj: { [key: string]: unknown }) => {
  const cloneObj = { ...detailObj };
  Object.keys(cloneObj).forEach((key) => {
    const value = cloneObj[key];
    if (isFalse(value)) {
      delete cloneObj[key];
    }
  });
  return cloneObj;
};
