/*
 * @description: use Model
 * @Author: OriX
 * @LastEditors: OriX
 */

import { Effect } from 'umi';
import { UserModelState } from '@/types/user';
import { accountLogin, accountLogout } from '@/server/user';
import { message } from 'antd';
import storage from '@/utils/projectStorage';
import { history } from '@/.umi/core/history';

export interface UserModelType {
  namespace: 'user';
  state: UserModelState | {};
  effects: {
    login: Effect;
    loginOut: Effect;
  };
  reducers: {
    saveCurrentUserInfo: (state: any, action: any) => void;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {},
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response?.errCode === 0) {
        yield put({
          type: 'saveCurrentUserInfo',
          payload: response.data,
        });
        message.success('登录成功');
        // 重定向到首页
        history.replace('/');
      } else {
        message.error(`登录失败`);
      }
    },
    *loginOut(_, { call }) {
      const response = yield call(accountLogout);
      if (response?.errCode === 0) {
        storage.removeItem('access_token');
        storage.removeItem('current_userInfo');
        message.success('操作成功');
        history.replace('/login');
      } else {
        message.warn(`操作失败`);
      }
    },
  },
  reducers: {
    saveCurrentUserInfo(state: any, { payload }) {
      storage.setItem('access_token', payload?.ori_acc_token);
      storage.setItem('current_userInfo', payload?.userInfo);
      return { ...state, ...payload?.userInfo };
    },
  },
};

export default UserModel;
