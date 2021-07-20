/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { LongBtn } from '@/components/lib';
import { Form, Input } from 'antd';

const RegisterScreens = () => {
  return (
    <>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input type="text" placeholder={'请输入用户名'} id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password type="text" placeholder={'请输入密码'} id="password" />
      </Form.Item>
      <Form.Item name="cPassword" rules={[{ required: true }]}>
        <Input.Password type="text" placeholder={'确认密码'} id="cPassword" />
      </Form.Item>
      <LongBtn type="primary" htmlType={'submit'}>
        {' '}
        注册
      </LongBtn>
    </>
  );
};
export default RegisterScreens;
