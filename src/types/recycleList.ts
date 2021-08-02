/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
/**
 * pending:待处理
 * reject:拒绝回收
 * agree:同意回收
 * contact:快递联系中
 * success:回收成功
 * failed:回收失败
 */
export enum RecycleStatus {
  pending,
  reject,
  agree,
  contact,
  success,
  failed,
}
export enum RecycleStatusCN {
  '待回收',
  '拒绝回收',
  '同意回收等待上门',
  '快递员联系中',
  '回收成功',
  '回收失败',
}
export interface RecycleRowData {
  studentId: number;
  status: number;
  contactsName: string;
  contactsPhone: string;
  contactsAddress: string;
  contactsTime: string;
  indexG: number;
}
