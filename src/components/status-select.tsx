/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { IdSelect } from './IdSelect';
const StatusSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  // 先获取用户的数据
  const RecycleStatusCNArr = [
    { statusId: 0, statusCN: '待回收' },
    { statusId: 1, statusCN: '拒绝回收' },
    { statusId: 2, statusCN: '同意回收等待上门' },
    { statusId: 3, statusCN: '快递员联系中' },
    { statusId: 4, statusCN: '回收成功' },
    { statusId: 5, statusCN: '回收失败' },
  ];
  // 渲染用户的下拉列表
  return <IdSelect options={RecycleStatusCNArr || []} {...props} />;
};
export default StatusSelect;
