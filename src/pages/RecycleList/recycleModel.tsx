/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRecycleListModal } from './utils';
import { connect } from '@/.umi/plugin-dva/exports';
// TODO:连接测试数据
const RecycleListModal = () => {
  const { modalOpen, open, close } = useRecycleListModal();
  const [form] = useForm();
  // 表单提交的回调
  const onFinish = (values: any) => {
    // 调用对应的dispatch方法 传递数据
    // 重置表单
    form.resetFields();
    // 关闭
    close();
  };
  // 用useEffect 对modal进行监测 当form 和editing状态改变 就重置数据  这里直接填充对应id的数据
  useEffect(() => {
    form.setFieldsValue('');
  }, [form]);
  // 因为要重置表单 所以对close方法二次封装
  const closeModal = () => {
    // 重置表单
    form.resetFields();
    // 关闭modal
    close();
  };
  return <Drawer></Drawer>;
};
function mapStateToProps(state: any) {
  const { currentDetailInfo } = state.recycleList;
  return {
    currentDetailInfo,
  };
}
export default connect(mapStateToProps)(RecycleListModal);
