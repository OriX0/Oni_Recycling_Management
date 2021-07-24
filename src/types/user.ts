/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */
export interface UserModelState {
  username: string;
  password: string;
  avatarUrl: string;
  city: string;
  role: '1' | '2';
  is_locked: '0' | '1';
}
export interface AuthInfo {
  username: string;
  password: string;
}
