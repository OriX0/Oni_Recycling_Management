/*
 * @Description: url操作相关customer hook
 * @Author: OriX
 * @LastEditors: OriX
 */
import useUrlState from '@ahooksjs/use-url-state';
import qs from 'qs';
import { useMemo } from 'react';

// 从url的get和设置get 的key的方法
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // 从window 获取location中的search
  const search = window.location.search.split('?')[1];
  const queryObj = qs.parse(search);
  // set方法
  const setSearchParams = useSetUrlSearchParam();
  // 返回
  return [
    useMemo(
      () =>
        keys.reduce((pre, curKey) => {
          // 拼接成对象返回
          return { ...pre, [curKey]: queryObj[curKey] || '' };
        }, {} as { [key in K]: string }),
      // 当监听的search 参数改变时候重新计算 obj
      [search],
    ),
    // 返回设置 这些search参数的方法  及传入了那些可以进行设置
    (params: { [key in K]?: any }) => {
      return setSearchParams(params);
    },
  ] as const;
};

// 设置
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useUrlState({});
  return (params: { [key in string]: unknown }) => {
    setSearchParam(params);
  };
};
