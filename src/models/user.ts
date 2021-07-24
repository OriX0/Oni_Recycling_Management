/*
 * @description: use Model
 * @Author: OriX
 * @LastEditors: OriX
 */

import { Effect, Reducer } from 'umi';
import { UserModelState } from '@/types/user';
import { accountLogin } from '@/server/user';
import { message } from 'antd';
import db from '@/utils/db';

export interface UserModelType {
  namespace: 'user';
  state: UserModelState | {};
  effects: {
    login: Effect;
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
      console.log(response);
      if (response.errCode === 0) {
        message.success('登录成功');
        const userInfo = response.data?.userInfo;
        console.log(userInfo);
        yield put({
          type: 'saveCurrentUserInfo',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    saveCurrentUserInfo(state: any, { payload }) {
      db.setItem('access_token', payload?.ori_acc_token);
      db.setItem('current_userInfo', payload?.userInfo);
      return { ...state, ...payload?.userInfo };
    },
  },
};

export default UserModel;
