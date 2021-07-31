/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import projectStorage from '@/utils/projectStorage';
import { Effect, Reducer } from 'umi';
import { RecycleRowData } from '@/types/recycleList';
import { delay } from '@/utils';

interface RecycleListState {
  list: RecycleRowData[];
  currentDetail: number | null;
  currentDetailInfo: RecycleRowData | {};
}
export interface RecycleListModelType {
  namespace: 'recycleList';
  state: RecycleListState;
  effects: {
    query: Effect;
    changeCurrent: Effect;
  };
  reducer: {
    changeDetail: Reducer<RecycleListState>;
    getInfoByID: Reducer<RecycleListState>;
  };
}
const RecycleListModel: RecycleListModelType = {
  namespace: 'recycleList',
  state: {
    list: projectStorage.getItem('recycleList') || [],
    currentDetail: null,
    currentDetailInfo: {},
  },
  effects: {
    *query({ payload }, { call, put }) {},
    // TODO:测试put的第二个参数具体是什么
    *changeCurrent({ payload }, { call, put }) {
      // 模仿请求缓冲 等待几秒
      yield call(delay(Math.ceil(Math.random() * 1000)));
      yield put({
        type: 'getInfoByID',
        value: payload,
      });
    },
  },
  reducer: {
    changeDetail(state: any, action) {
      return { ...state, currentDetail: action.payload };
    },
    getInfoByID(state: RecycleListState | undefined, action) {
      console.log(action);
      const currentInfo = state?.list.find(
        (item) => item.studentId === action.payload,
      );
      return { ...state, currentDetailInfo: currentInfo } as RecycleListState;
    },
  },
};
