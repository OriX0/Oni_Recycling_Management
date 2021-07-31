/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useDispatch, useLocation } from 'umi';
import qs from 'qs';
import { useState } from 'react';
export const useRecycleListModal = () => {
  const currentUrl = useLocation();
  const [visible, changeVisible] = useState(false);
  const query = qs.parse(currentUrl.search.split('?')[0]);
  const { id, editing } = query;
  if (id || editing) {
    changeVisible(true);
  }
  // 调用dispatch 获取当前id的item数据

  // modal的open和close方法
  const open = () => changeVisible(true);
  const close = () => changeVisible(false);
  return {
    modalOpen: visible,
    open,
    close,
  };
};
