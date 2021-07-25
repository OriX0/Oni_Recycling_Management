/*
 * @description: user server 与后端进行交互 暂时用mock方案
 * @Author: OriX
 * @LastEditors: OriX
 */

import request from '@/utils/request';
import { AuthInfo } from '@/types/user';

export async function accountLogin(params: AuthInfo) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function accountLogout() {
  return request.post('/auth/logout');
}
