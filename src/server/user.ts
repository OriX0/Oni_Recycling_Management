/*
 * @description: user server 与后端进行交互 暂时用mock方案
 * @Author: OriX
 * @LastEditors: OriX
 */

import request from 'umi-request';
import db from '@/utils/db';
import { AuthInfo } from '@/types/user';

export async function accountLogin(params: AuthInfo) {
  console.log(params);
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}
