/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import projectStorage from '@/utils/projectStorage';
import { Effect } from 'umi';
import { RecycleRowData } from '@/types/recycleList';

interface RecycleListState {
  list: RecycleRowData[];
  nowDetail: number | null;
}
export interface RecycleListModelType {
  namespace: 'recycleList';
  state: RecycleListState;
  effects: {
    query: Effect;
  };
}
const RecycleListModel: RecycleListModelType = {
  namespace: 'recycleList',
  state: {
    list: projectStorage.getItem('recycleList') || [],
    nowDetail: null,
  },
  effects: {
    *query({ payload }, { call, put }) {},
  },
};
