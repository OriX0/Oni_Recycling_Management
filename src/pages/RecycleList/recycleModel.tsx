/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useEffect } from 'react';
import { Drawer, Spin, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRecycleListModal } from './utils';
import { ConnectRC } from '@/.umi/plugin-dva/connect';
import { RecycleRowData } from '@/types/recycleList';
import { Container } from './style';
import StatusSelect from '@/components/status-select';
import { connect } from 'umi';

interface RecycleListModalProps {
  currentDetailInfo: RecycleRowData;
}
const RecycleListModal: ConnectRC<RecycleListModalProps> = (props) => {
  const { modalOpen, close, editingProjectId } = useRecycleListModal();
  const { dispatch, currentDetailInfo } = props;
  const [form] = useForm();
  // modal 被展开 如果当前是直接通过url访问的 先进行本次数据请求
  if (!currentDetailInfo?.studentId && editingProjectId) {
    dispatch({
      type: 'recycleList/changeCurrent',
      payload: editingProjectId,
    });
  }
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
    form.setFieldsValue(currentDetailInfo);
  }, [currentDetailInfo, form]);
  // 因为要重置表单 所以对close方法二次封装
  const closeModal = () => {
    // 重置reducer current数据
    dispatch({
      type: 'recycleList/changeCurrent',
      payload: 'reset',
    });
    // 重置表单
    form.resetFields();
    // 关闭modal
    close();
  };
  const statusChange = (statusId: number) => {
    if (statusId === 3) {
    }
  };
  return (
    <Drawer
      visible={modalOpen}
      onClose={closeModal}
      forceRender={true}
      width={'40%'}
    >
      <Container>
        {!currentDetailInfo?.studentId ? (
          <Spin size={'large'} />
        ) : (
          <Form
            form={form}
            layout={'vertical'}
            style={{ width: '90%' }}
            onFinish={onFinish}
          >
            <Form.Item
              name="status"
              label="回收状态"
              hasFeedback
              rules={[{ required: true, message: '必须选择一个回收状态' }]}
            >
              <StatusSelect
                defaultOptionName={'回收状态'}
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Form.Item>
            <Form.Item
              label={'联系人'}
              name={'contactsName'}
              rules={[{ required: true, message: '请输入上门联系人' }]}
            >
              <Input placeholder={'请输入上门联系人'} />
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.status !== currentValues.status
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('status') === 2 ? (
                  <Form.Item
                    name="contactsPhone"
                    label="联系人手机号"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.status !== currentValues.status
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('status') === 2 ? (
                  <Form.Item
                    name="contactsAddress"
                    label="联系人地址"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.status !== currentValues.status
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('status') === 2 ? (
                  <Form.Item
                    name="contactsTime"
                    label="上门回收时间"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Form>
        )}
      </Container>
    </Drawer>
  );
};
function mapStateToProps(state: any) {
  const { currentDetailInfo } = state.recycleList;
  return {
    currentDetailInfo,
  };
}
export default connect(mapStateToProps)(RecycleListModal);
