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
  reducers: {
    changeDetail: Reducer<RecycleListState>;
    getInfoByID: Reducer<RecycleListState>;
    clearCurrentInfo: Reducer<RecycleListState>;
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
    *changeCurrent({ payload }, { call, put }) {
      // 模仿请求缓冲 等待几秒
      const delayTime = Math.ceil(Math.random() * 1000 * 3);
      yield call(delay, delayTime);
      if (+payload) {
        yield put({
          type: 'getInfoByID',
          id: payload,
        });
      } else {
        yield put({
          type: 'clearCurrentInfo',
        });
      }
    },
  },
  reducers: {
    changeDetail(state: any, action) {
      return { ...state, currentDetail: action.payload };
    },
    getInfoByID(state: RecycleListState | undefined, action) {
      const currentInfo = state?.list.find(
        (item) => item.studentId === +action.id,
      );
      console.log('getInfoByID');
      console.log('currentInfo', currentInfo);
      return { ...state, currentDetailInfo: currentInfo } as RecycleListState;
    },
    clearCurrentInfo(state) {
      console.log('clearCurrentInfo');
      return { ...state, currentDetailInfo: {} } as RecycleListState;
    },
  },
};
export default RecycleListModel;
