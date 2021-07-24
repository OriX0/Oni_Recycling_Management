/*
 * @Description: customer storage 相关的type
 * @Author: OriX
 * @LastEditors: OriX
 */
export interface IStorageBootStrapConfig {
  // 模式 local or session模式
  mode: 'session' | 'local';
  // 超时时间
  timeout: number;
}
export interface IStorageValueFormat {
  saveTimeStamp: number;
  data: any;
}
