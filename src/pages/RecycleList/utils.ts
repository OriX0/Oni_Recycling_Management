/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */

import { useSetUrlSearchParam, useUrlQueryParam } from '@/utils/url';
export const useRecycleListModal = () => {
  // 当前是否在编辑
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId',
  ]);
  // 获取设置url的方法
  const setUrlParams = useSetUrlSearchParam();
  const close = () => {
    setUrlParams({ editingProjectId: undefined });
  };
  // 定义返回 进入编辑弹框的方法
  const startEdit = (id: number) => {
    setEditingProjectId({ editingProjectId: id });
  };
  return {
    modalOpen: !!editingProjectId, // 将editingProjectId 转换为布尔值
    close,
    startEdit,
    editingProjectId,
  };
};
